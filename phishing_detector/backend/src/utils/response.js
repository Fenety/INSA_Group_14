// src/utils/response.js
function formatResponse({ risk_score = 0, reasons = [], recommendation = '', intel = {} } = {}) {
  // ensure types are sane
  return {
    risk_score: Number(risk_score),
    reasons: Array.isArray(reasons) ? reasons : [String(reasons)],
    recommendation: String(recommendation),
    intel: intel || {}
  };
}

module.exports = { formatResponse };
