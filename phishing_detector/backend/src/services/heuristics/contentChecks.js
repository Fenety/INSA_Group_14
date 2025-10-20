// heuristics/contentChecks.js
exports.checkEmail = (emailText) => {
  const details = [];
  let score = 0;
  const text = emailText.toLowerCase();

  // --- 1. Keyword-based phishing checks ---
  const keywords = [
    { words: ['verify your password'], weight: 0.3, reason: 'Contains password verification request' },
    { words: ['click here'], weight: 0.25, reason: 'Contains click-bait link' },
    { words: ['urgent', 'immediately'], weight: 0.2, reason: 'Uses urgency trigger words' },
    { words: ['account suspended', 'security alert', 'account locked'], weight: 0.35, reason: 'Mentions account suspension or security alert' },
    { words: ['password expired', 'update credentials'], weight: 0.2, reason: 'Mentions password update' },
  ];

  keywords.forEach(k => {
    k.words.forEach(word => {
      const matches = (text.match(new RegExp(word, 'gi')) || []).length;
      if (matches > 0) {
        score += matches * k.weight;
        details.push({ reason: k.reason, matches, weight: k.weight });
      }
    });
  });

  // --- 2. Presence of suspicious links (e.g., URLs in email body) ---
  const urlPattern = /(https?:\/\/[^\s]+)/gi;
  const urls = text.match(urlPattern) || [];
  if (urls.length > 0) {
    score += Math.min(urls.length * 0.05, 0.2); // each URL adds small risk
    details.push({ reason: 'Contains URL(s) in email body', count: urls.length, weight: 0.05 });
  }

  // --- 3. Email text length anomalies ---
  if (text.length < 20) {
    score += 0.05; // unusually short emails could be suspicious
    details.push({ reason: 'Unusually short email content', weight: 0.05 });
  } else if (text.length > 2000) {
    score += 0.05; // unusually long email
    details.push({ reason: 'Unusually long email content', weight: 0.05 });
  }

  // --- 4. Suspicious characters in text ---
  if (/[!@#$%^&*()_+=]/.test(text)) {
    score += 0.05;
    details.push({ reason: 'Suspicious characters detected', weight: 0.05 });
  }

  // --- Cap the score at 1 ---
  score = Math.min(score, 1);

  // --- Determine verdict ---
  let verdict = 'Safe';
  if (score >= 0.8) verdict = 'High Risk';
  else if (score >= 0.5) verdict = 'Suspicious';

  return { score, verdict, details };
};
