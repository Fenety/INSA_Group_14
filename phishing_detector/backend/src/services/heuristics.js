// Heuristic analysis + risk scoring + intel info
function getRiskLevel(risk_score) {
  if (risk_score <= 30) return 'Low';
  if (risk_score <= 70) return 'Medium';
  return 'High';
}

function analyzeURL(url) {
  let risk_score = 0;
  const reasons = [];
  const intel = {};

  // Long URL
  if (url.length > 75) { risk_score += 15; reasons.push('URL is very long'); }

  // IP in domain
  const ipRegex = /https?:\/\/(\d{1,3}\.){3}\d{1,3}/;
  if (ipRegex.test(url)) { risk_score += 30; reasons.push('IP address in domain'); intel.suspicious_ip = url.match(ipRegex); }

  // Suspicious TLDs
  const suspiciousTLDs = ['.xyz', '.top', '.club', '.online'];
  if (suspiciousTLDs.some(tld => url.endsWith(tld))) { risk_score += 20; reasons.push('Suspicious TLD'); intel.suspicious_tld = url.split('.').pop(); }

  // Many subdomains
  const host = url.split('//')[1]?.split('/')[0] || '';
  const subdomainCount = host.split('.').length - 2;
  if (subdomainCount > 3) { risk_score += 10; reasons.push('Too many subdomains'); intel.subdomain_count = subdomainCount; }

  // Phishing keywords
  const keywords = ['login', 'secure', 'update', 'bank', 'verify'];
  const foundKeywords = keywords.filter(k => url.toLowerCase().includes(k));
  if (foundKeywords.length > 0) { risk_score += 25; reasons.push('Contains phishing keywords'); intel.keywords = foundKeywords; }

  if (risk_score > 100) risk_score = 100;

  const risk_level = getRiskLevel(risk_score);
  return { risk_score, risk_level, reasons, intel };
}

function analyzeEmail({ from, subject, body, headers }) {
  let risk_score = 0;
  const reasons = [];
  const intel = {};

  // Keywords in email
  const keywords = ['urgent', 'verify', 'password', 'bank', 'login'];
  const foundKeywords = keywords.filter(k => (subject + body).toLowerCase().includes(k));
  if (foundKeywords.length > 0) { risk_score += 20; reasons.push('Contains phishing keywords'); intel.keywords = foundKeywords; }

  // Sender domain mismatch (example)
  if (!from.includes('@trusted.com')) { risk_score += 25; reasons.push('Sender domain mismatch'); intel.sender = from; }

  // Suspicious links
  const urlRegex = /https?:\/\/[^\s]+/g;
  const urls = body.match(urlRegex) || [];
  const suspiciousUrls = [];
  urls.forEach(url => {
    const urlResult = analyzeURL(url);
    if (urlResult.risk_score > 50) {
      risk_score += 25;
      reasons.push('Contains suspicious links');
      suspiciousUrls.push(url);
    }
  });
  if (suspiciousUrls.length > 0) intel.suspicious_urls = suspiciousUrls;

  if (risk_score > 100) risk_score = 100;

  const risk_level = getRiskLevel(risk_score);
  return { risk_score, risk_level, reasons, intel };
}

module.exports = { analyzeURL, analyzeEmail };
