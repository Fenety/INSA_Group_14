function formatResponse({ risk_score, risk_level, reasons, recommendation, intel }) {
  return { risk_score, risk_level, reasons, recommendation, intel };
}

module.exports = { formatResponse };
