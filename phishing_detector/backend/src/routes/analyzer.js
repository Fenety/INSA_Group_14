// src/routes/analyzer.js
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const { formatResponse } = require('../utils/response');
const { analyzeURL, analyzeEmail } = require('../services/heuristics');

// ------------------- URL analysis -------------------
router.post('/analyze_url', (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'Missing required field: url' });

  const result = analyzeURL(url);

  const response = formatResponse({
    risk_score: result.risk_score,
    reasons: result.reasons,
    recommendation: result.risk_score > 70 ? 'Do NOT click this link' : 'Proceed with caution',
    intel: result.intel
  });

  res.json(response);
});

// ------------------- Email analysis + optional send -------------------
router.post('/analyze_email', async (req, res) => {
  const { to, subject, message, notifyEmail } = req.body; 
  // notifyEmail is optional: email address to send analysis to

  if (!to && !subject && !message) return res.status(400).json({ error: 'Missing email data' });

  // Run phishing heuristics
  const result = analyzeEmail({ from: to, subject, body: message, headers: {} });

  const response = formatResponse({
    risk_score: result.risk_score,
    reasons: result.reasons,
    recommendation: result.risk_score > 70 ? 'Do NOT trust this email' : 'Verify sender before trusting',
    intel: result.intel
  });

  // Send notification email if notifyEmail is provided
  if (notifyEmail) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: notifyEmail,
        subject: `Phishing Analysis Result: ${subject || 'No Subject'}`,
        text: `
Phishing Analysis Result:

Risk Score: ${response.risk_score}
Reasons: ${response.reasons.join(', ')}
Recommendation: ${response.recommendation}
Intel: ${JSON.stringify(response.intel, null, 2)}
        `
      };

      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.error('Failed to send notification email:', err);
    }
  }

  res.json(response);
});

module.exports = router;
