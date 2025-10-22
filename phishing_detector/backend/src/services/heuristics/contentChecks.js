// heuristics/contentChecks.js
exports.checkEmail = (emailText) => {
  const checks = [];
  let score = 0;
  const text = emailText.toLowerCase();

  const keywords = [
    { words: ['verify your password'], weight: 0.35, reason: 'contains password verification request' },
    { words: ['click here'], weight: 0.35, reason: 'contains click-bait link' },
    { words: ['urgent', 'immediately'], weight: 0.25, reason: 'uses urgency trigger words' },
    { words: ['account suspended', 'security alert', 'account locked'], weight: 0.35, reason: 'mentions account suspension or security alert' },
    { words: ['password expired', 'update credentials'], weight: 0.35, reason: 'mentions password update' },
    { words: ['Dear User', 'User'], weight: 0.25, reason: 'Uses Generic names' },
    // New checks for stricter detection
    { words: ['confirm your identity', 'verify your account'], weight: 0.3, reason: 'requests identity verification' },
    { words: ['update your details', 'change your password'], weight: 0.3, reason: 'requests details update' },
    { words: ['suspicious activity', 'unauthorized access'], weight: 0.35, reason: 'mentions suspicious activity' },
    { words: ['click the button', 'follow this link', 'visit this site'], weight: 0.35, reason: 'directs to click link' },
    { words: ['dear customer', 'dear valued customer', 'hello user'], weight: 0.25, reason: 'generic greeting' },
    { words: ['limited time', 'act now', 'offer expires'], weight: 0.25, reason: 'creates urgency' },
    { words: ['update your payment', 'billing information', 'credit card details'], weight: 0.35, reason: 'requests payment or billing update' },
    { words: ['attachment enclosed', 'open the attachment', 'download the file'], weight: 0.3, reason: 'mentions potentially malicious attachments' },
    { words: ['free gift', 'you won', 'claim your prize'], weight: 0.25, reason: 'uses reward or prize lures' },
    { words: ['account will be closed', 'service interruption', 'final notice'], weight: 0.35, reason: 'threatens account closure or service disruption' }
  ];

  keywords.forEach(k => {
    if (k.words.some(w => text.includes(w))) {
      score += k.weight;
      checks.push(k.reason);
    }
  });

  // Additional strict checks
  // Check for presence of URLs (common in phishing)
  const urlRegex = /(http:\/\/|https:\/\/|www\.)/gi;
  const urlMatches = text.match(urlRegex);
  if (urlMatches) {
    const urlCount = urlMatches.length;
    const urlScore = Math.min(urlCount * 0.1, 0.3);
    score += urlScore;
    checks.push(`Contains URL(s) (${urlCount}) – potential phishing vector`);
  }

  // Check for excessive capitalization (shouting for urgency)
  const allCapsRegex = /\b[A-Z]{4,}\b/g; // Words with 4+ uppercase letters
  const allCapsMatches = text.match(allCapsRegex);
  if (allCapsMatches && allCapsMatches.length > 1) {
    score += 0.2;
    checks.push('Contains excessive capitalization (potential urgency tactic)');
  }

  // Check for common phishing misspellings or poor grammar indicators (basic)
  const misspellingKeywords = ['recieve', 'acount', 'verfiy', 'securty'];
  if (misspellingKeywords.some(m => text.includes(m))) {
    score += 0.25;
    checks.push('Contains common misspellings indicative of phishing');
  }

  score = Math.min(score, 1);

  // Add verdict for stricter evaluation (similar to urlChecks)
  let verdict = 'Safe';
  if (score >= 0.7) verdict = 'High Risk'; // Lowered threshold from implied 0.8 for stricter
  else if (score >= 0.4) verdict = 'Suspicious'; // Lowered threshold from implied 0.5 for stricter

  return { score, verdict, details: checks };
};