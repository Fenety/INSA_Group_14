async function checkGoogleSafeBrowsing(url) {
  if (url.includes('bad')) return { safe: false, source: "Google Safe Browsing" };
  return { safe: true, source: "Google Safe Browsing" };
}

async function checkVirusTotal(url) {
  if (url.includes('vt-malicious')) return { safe: false, source: "VirusTotal" };
  return { safe: true, source: "VirusTotal (fake)" };
}

async function checkPhishTank(url) {
  if (url.includes('phish')) return { safe: false, source: "PhishTank " };
  return { safe: true, source: "PhishTank" };
}

module.exports = {
  checkGoogleSafeBrowsing,
  checkVirusTotal,
  checkPhishTank,
};
