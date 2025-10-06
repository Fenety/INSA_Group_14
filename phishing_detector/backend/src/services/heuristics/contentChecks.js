// heuristics/contentChecks.js
exports.checkEmail = (emailText) => {
  const checks = [];
  let score = 0;
  const text = emailText.toLowerCase();

  const keywords = [
    { words: ['verify your password'], weight: 0.3, reason: 'contains password verification request' },
    { words: ['click here'], weight: 0.3, reason: 'contains click-bait link' },
    { words: ['urgent', 'immediately'], weight: 0.2, reason: 'uses urgency trigger words' },
    { words: ['account suspended', 'security alert', 'account locked'], weight: 0.3, reason: 'mentions account suspension or security alert' },
    { words: ['password expired', 'update credentials'], weight: 0.2, reason: 'mentions password update' },
  ];

  keywords.forEach(k => {
    if (k.words.some(w => text.includes(w))) {
      score += k.weight;
      checks.push(k.reason);
    }
  });

  score = Math.min(score, 1);

  return { score, details: checks };
};
