// src/services/heuristics.js

const suspiciousTLDs = ['.xyz', '.top', '.ru', '.cn', '.tk'];
const phishingKeywords = ['login', 'secure', 'update', 'verify', 'bank', 'account', 'password'];

/**
 * Analyze a URL for suspicious patterns.
 * @param {string} url
 * @returns {{ risk_score: number, reasons: string[], intel: object }}
 */
function analyzeURL(url) {
  const reasons = [];
  let score = 0;

  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname;

    // 1. Long URL
    if (url.length > 75) {
      reasons.push('Very long URL (>75 chars)');
      score += 15;
    }

    // 2. IP address in domain
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
      reasons.push('Domain is an IP address');
      score += 20;
    }

    // 3. Suspicious TLD
    suspiciousTLDs.forEach(tld => {
      if (hostname.endsWith(tld)) {
        reasons.push(`Suspicious TLD detected (${tld})`);
        score += 20;
      }
    });

    // 4. Too many subdomains
    const subdomains = hostname.split('.');
    if (subdomains.length > 3) {
      reasons.push('Too many subdomains');
      score += 15;
    }

    // 5. Phishing keywords
    phishingKeywords.forEach(word => {
      if (url.toLowerCase().includes(word)) {
        reasons.push(`Contains phishing keyword: "${word}"`);
        score += 10;
      }
    });

    return {
      risk_score: Math.min(score, 100),
      reasons,
      intel: { hostname, length: url.length }
    };
  } catch (err) {
    return {
      risk_score: 100,
      reasons: ['Invalid URL format'],
      intel: {}
    };
  }
}

/**
 * Analyze email headers/body for suspicious signs.
 * @param {object} email
 * @returns {{ risk_score: number, reasons: string[], intel: object }}
 */
function analyzeEmail(email) {
  const { from, subject = '', headers = {}, body = '' } = email;
  const reasons = [];
  let score = 0;

  // 1. SPF/DKIM/DMARC flags
  if (headers['Received-SPF'] && headers['Received-SPF'].toLowerCase().includes('fail')) {
    reasons.push('SPF check failed');
    score += 20;
  }
  if (headers['Authentication-Results'] && headers['Authentication-Results'].toLowerCase().includes('dkim=fail')) {
    reasons.push('DKIM check failed');
    score += 20;
  }
  if (headers['Authentication-Results'] && headers['Authentication-Results'].toLowerCase().includes('dmarc=fail')) {
    reasons.push('DMARC check failed');
    score += 20;
  }

  // 2. Suspicious "from"
  if (from && from.includes('@gmail.com') && subject.toLowerCase().includes('bank')) {
    reasons.push('Free email provider used for banking-related message');
    score += 15;
  }

  // 3. Phishing keywords in subject/body
  phishingKeywords.forEach(word => {
    if (subject.toLowerCase().includes(word) || body.toLowerCase().includes(word)) {
      reasons.push(`Suspicious keyword in email: "${word}"`);
      score += 10;
    }
  });

  return {
    risk_score: Math.min(score, 100),
    reasons,
    intel: { from, subject }
  };
}

module.exports = { analyzeURL, analyzeEmail };
