const urlChecks = require('./heuristics/urlChecks');
const contentChecks = require('./heuristics/contentChecks');
const mlChecks = require('./heuristics/mlChecks');
const ScanResult = require('../db/models/ScanResult');
const { PHISHING_THRESHOLD } = require('../config/constants');

// --- Toggle fake vs real external APIs ---
const useFake = process.env.USE_FAKE_API === 'true';
const { checkGoogleSafeBrowsing, checkVirusTotal, checkPhishTank } = useFake
  ? require('./heuristics/externalAPIs.fake')
  : require('./heuristics/externalAPIs');

exports.analyzeUrl = async (url) => {
  try {
    // --- 1. Heuristic check ---
    let heuristicsScore = 0;
    let details = [];
    const heuristicResult = urlChecks.checkUrl(url);
    if (heuristicResult && typeof heuristicResult === 'object') {
      heuristicsScore = heuristicResult.score || 0;
      details = heuristicResult.details || [];
    }

    // --- 2. ML check ---
    const mlScore = await mlChecks.evaluateUrl(url);

    // --- 3. External API checks in parallel ---
    const [google, vt, phish] = await Promise.all([
      checkGoogleSafeBrowsing(url),
      checkVirusTotal(url),
      checkPhishTank(url),
    ]);

    const externalChecks = [google, vt, phish].filter(r => r.safe !== null);
    const externalSafe = externalChecks.every(r => r.safe === true);

    // --- 4. Combine final score & verdict ---
    const finalScore = (heuristicsScore + mlScore) / 2;
    const verdict = finalScore > PHISHING_THRESHOLD || !externalSafe ? 'Suspicious' : 'Safe';

    // --- 5. Save to MongoDB ---
    const saved = await ScanResult.create({
      type: 'url',
      url,
      heuristicsScore,
      mlScore,
      score: finalScore,
      verdict,
      details: externalChecks,
    });

    return {
      success: true,
      data: {
        id: saved._id,
        url,
        heuristicsScore,
        mlScore,
        score: finalScore,
        verdict,
        details: externalChecks,
      },
    };
  } catch (error) {
    console.error('❌ analyzeUrl error:', error);
    return { success: false, code: 'server_error', message: error.message };
  }
};

// --- Optional: analyzeEmail can be adapted the same way ---
exports.analyzeEmail = async (email) => {
  try {
    let heuristicsScore = 0;
    let details = [];

    const heuristicResult = contentChecks.checkEmail(email);
    if (heuristicResult && typeof heuristicResult === 'object') {
      heuristicsScore = heuristicResult.score || 0;
      details = heuristicResult.details || [];
    }

    const mlScore = await mlChecks.evaluateEmail(email);
    const finalScore = (heuristicsScore + mlScore) / 2;
    const verdict = finalScore > PHISHING_THRESHOLD ? 'Suspicious' : 'Safe';

    const saved = await ScanResult.create({
      type: 'email',
      email: email.slice(0, 200),
      heuristicsScore,
      mlScore,
      score: finalScore,
      verdict,
      details,
    });

    return {
      success: true,
      data: {
        id: saved._id,
        email: saved.email,
        heuristicsScore,
        mlScore,
        score: finalScore,
        verdict,
        details,
      },
    };
  } catch (error) {
    console.error('❌ analyzeEmail error:', error);
    return { success: false, code: 'server_error', message: error.message };
  }
};
