// heuristics/urlChecks.js
exports.checkUrl = (url) => {
  let score = 0;
  const details = [];

  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();

    // --- Protocol check ---
    if (parsedUrl.protocol !== 'https:') {
      score += 0.15;
      details.push('URL does not use HTTPS');
    }

    // --- Dash in domain (each dash adds 0.1) ---
    const domainPart = hostname.split('.')[0];
    const dashCount = (domainPart.match(/-/g) || []).length;
    if (dashCount > 0) {
      const dashScore = Math.min(dashCount * 0.1, 0.3);
      score += dashScore;
      details.push(`Dash(es) detected in domain (${dashCount})`);
    }

    // --- Brand-like keywords (each keyword adds 0.15, max 0.45) ---
    const brandKeywords = ['login', 'secure', 'verify', 'update', 'bank', 'account'];
    let keywordCount = 0;
    for (const keyword of brandKeywords) {
      if (hostname.includes(keyword)) {
        keywordCount += 1;
        details.push(`Contains brand-like keyword "${keyword}"`);
      }
    }
    const brandScore = Math.min(keywordCount * 0.15, 0.45);
    score += brandScore;

    // --- Long subdomain (suspicious) ---
    const subdomains = hostname.split('.');
    if (subdomains.length > 2) {
      score += 0.1;
      details.push('Long subdomain detected (potential phishing)');
    }

    // --- Suspicious TLDs ---
    const suspiciousTLDs = ['tk', 'ml', 'ga', 'cf', 'gq'];
    const tld = hostname.split('.').pop();
    if (suspiciousTLDs.includes(tld)) {
      score += 0.2;
      details.push(`Suspicious TLD detected: .${tld}`);
    }

    // Cap the score at 1
    if (score > 1) score = 1;

  } catch (err) {
    details.push('Invalid URL format');
    score = 1; // Treat invalid URLs as highly suspicious
  }

  // --- Determine verdict ---
  let verdict = 'Safe';
  if (score >= 0.8) verdict = 'High Risk';
  else if (score >= 0.5) verdict = 'Suspicious';

  return { score, verdict, details };
};
