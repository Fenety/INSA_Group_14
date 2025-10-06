// services/analyzerService.js
const urlChecks = require('./heuristics/urlChecks');
const contentChecks = require('./heuristics/contentChecks');
const mlChecks = require('./heuristics/mlChecks');
const ScanResult = require('../db/models/ScanResult');
const { PHISHING_THRESHOLD } = require('../config/constants');

exports.analyzeUrl = async (url) => {
  try {
    let heuristicsScore = 0;
    let details = [];

    const heuristicResult = urlChecks.checkUrl(url);
    if (heuristicResult && typeof heuristicResult === 'object') {
      heuristicsScore = heuristicResult.score || 0;
      details = heuristicResult.details || [];
    }

    const mlScore = await mlChecks.evaluateUrl(url);
    const finalScore = (heuristicsScore + mlScore) / 2;
    const verdict = finalScore > PHISHING_THRESHOLD ? 'Suspicious' : 'Safe';

    const saved = await ScanResult.create({
      type: 'url',
      url,
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
        url,
        heuristicsScore,
        mlScore,
        score: finalScore,
        verdict,
        details,
      },
    };
  } catch (error) {
    console.error('❌ analyzeUrl error:', error);
    return { success: false, code: 'server_error', message: error.message };
  }
};

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
