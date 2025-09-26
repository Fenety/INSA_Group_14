function formatResponse({ risk_score, reasons, recommendation, intel }) {
  // Dynamic recommendation based on risk score
  let rec = '';
  if (risk_score >= 80) rec = 'Do NOT click or trust this link/email';
  else if (risk_score >= 50) rec = 'Proceed with caution; verify first';
  else rec = 'Likely safe, but stay alert';

  return { risk_score, reasons, recommendation: rec, intel };
}

module.exports = { formatResponse };
