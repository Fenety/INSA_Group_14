// services/externalAPIs.js
const axios = require("axios");
const FormData = require("form-data");

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const VIRUSTOTAL_API_KEY = process.env.VIRUSTOTAL_API_KEY;

async function checkGoogleSafeBrowsing(url) {
  try {
    const endpoint = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${GOOGLE_API_KEY}`;
    const body = {
      client: { clientId: "phishing-detector", clientVersion: "1.0" },
      threatInfo: {
        threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
        platformTypes: ["ANY_PLATFORM"],
        threatEntryTypes: ["URL"],
        threatEntries: [{ url }],
      },
    };
    const { data } = await axios.post(endpoint, body);
    return data.matches ? { safe: false, source: "Google Safe Browsing" } : { safe: true };
  } catch (err) {
    console.error("Google Safe Browsing error:", err.message);
    return { safe: null };
  }
}

async function checkVirusTotal(url) {
  try {
    const { data } = await axios.post(
      "https://www.virustotal.com/api/v3/urls",
      new URLSearchParams({ url }),
      { headers: { "x-apikey": VIRUSTOTAL_API_KEY, "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const analysisId = data.data.id;

    const report = await axios.get(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
      headers: { "x-apikey": VIRUSTOTAL_API_KEY },
    });

    const positives = Object.values(report.data.data.attributes.results).filter(r => r.category === "malicious");

    return positives.length > 0 ? { safe: false, source: "VirusTotal" } : { safe: true };
  } catch (err) {
    console.error("VirusTotal error:", err.message);
    return { safe: null };
  }
}

async function checkPhishTank(url) {
  try {
    const form = new FormData();
    form.append("url", url);
    form.append("format", "json");
    form.append("app_key", ""); // optional

    const { data } = await axios.post("https://checkurl.phishtank.com/checkurl/", form, {
      headers: form.getHeaders(),
    });

    const verified = data.results?.valid || false;
    return verified ? { safe: false, source: "PhishTank" } : { safe: true };
  } catch (err) {
    console.error("PhishTank error:", err.message);
    return { safe: null };
  }
}

module.exports = {
  checkGoogleSafeBrowsing,
  checkVirusTotal,
  checkPhishTank,
};
