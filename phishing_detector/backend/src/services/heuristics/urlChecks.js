// heuristics/urlChecks.js
exports.checkUrl = (url) => {
  let score = 0;
  const details = [];

  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();

    // --- 1. Protocol check ---
    if (parsedUrl.protocol !== 'https:') {
      score += 0.15;
      details.push('URL does not use HTTPS');
    }

    // --- 2. Dash in domain (each dash adds 0.1, max 0.3) ---
    const domainPart = hostname.split('.')[0];
    const dashCount = (domainPart.match(/-/g) || []).length;
    if (dashCount > 0) {
      const dashScore = Math.min(dashCount * 0.1, 0.3);
      score += dashScore;
      details.push(`Dash(es) detected in domain (${dashCount})`);
    }

    // --- 3. Brand-like keywords (each adds 0.15, max 0.45) ---
    const brandKeywords = ['login', 'secure', 'verify', 'update', 'bank', 'account'];
    let keywordCount = 0;
    for (const keyword of brandKeywords) {
      if (hostname.includes(keyword)) {
        keywordCount += 1;
        details.push(`Contains brand-like keyword "${keyword}"`);
      }
    }
    score += Math.min(keywordCount * 0.15, 0.45);

    // --- 4. Long subdomain (suspicious) ---
    const subdomains = hostname.split('.');
    if (subdomains.length > 2) {
      score += 0.1;
      details.push('Long subdomain detected (potential phishing)');
    }

    // --- 5. Suspicious TLDs ---
    const suspiciousTLDs = ['tk', 'ml', 'ga', 'cf', 'gq'];
    const tld = hostname.split('.').pop();
    if (suspiciousTLDs.includes(tld)) {
      score += 0.2;
      details.push(`Suspicious TLD detected: .${tld}`);
    }

    // --- 6. IP address instead of domain ---
    const ipPattern = /^(?:\d{1,3}\.){3}\d{1,3}$/;
    if (ipPattern.test(hostname)) {
      score += 0.3;
      details.push('URL uses an IP address instead of a domain');
    }

    // --- 7. Excessive URL length ---
    if (url.length > 75) {
      score += 0.1;
      details.push('URL is unusually long (potential phishing)');
    }

    // --- 8. Multiple query params / suspicious characters ---
    if (parsedUrl.searchParams && [...parsedUrl.searchParams].length > 3) {
      score += 0.05;
      details.push('Multiple query parameters detected');
    }
    if (/[!@#$%^&*()_+=]/.test(url)) {
      score += 0.05;
      details.push('Suspicious characters detected in URL');
    }

    // Cap the score at 1
    if (score > 1) score = 1;

  } catch (err) {
    details.push('Invalid URL format');
    score = 1; // Invalid URLs treated as high risk
  }

  // --- Determine verdict based on score ---
  let verdict = 'Safe';
  if (score >= 0.8) verdict = 'High Risk';
  else if (score >= 0.5) verdict = 'Suspicious';

  return { score, verdict, details };
};
