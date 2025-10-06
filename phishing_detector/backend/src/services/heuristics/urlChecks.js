// heuristics/urlChecks.js
exports.checkUrl = (url) => {
  let score = 0;
  const details = [];

  try {
    const hostname = new URL(url).hostname;

    // Example heuristics
    if (hostname.split('.')[0].includes('-')) {
      score += 0.3;
      details.push('Dash in domain detected');
    }

    const brandKeywords = ['login', 'secure', 'verify', 'update', 'bank', 'account'];
    for (const keyword of brandKeywords) {
      if (hostname.toLowerCase().includes(keyword)) {
        score += 0.4;
        details.push(`Contains brand-like keyword "${keyword}"`);
        break;
      }
    }

    if (score > 1) score = 1;
  } catch (err) {
    details.push('Invalid URL format');
  }

  return { score, details };
};
