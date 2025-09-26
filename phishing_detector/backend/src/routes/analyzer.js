const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const { formatResponse } = require('../utils/response');
const { analyzeURL, analyzeEmail } = require('../services/heuristics');
const ScanResult = require('../models/ScanResult');

// --- URL analysis ---
router.post('/analyze_url', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'Missing required field: url' });

    const result = analyzeURL(url);
    const response = formatResponse({
        risk_score: result.risk_score,
        reasons: result.reasons,
        recommendation: result.risk_score > 70 ? 'Do NOT click this link' : 'Proceed with caution',
        intel: result.intel
    });

    try {
        const scan = new ScanResult({
            type: 'url',
            input: { url },
            risk_score: result.risk_score,
            reasons: result.reasons,
            recommendation: response.recommendation,
            intel: result.intel
        });
        await scan.save();
    } catch (err) {
        console.error('Failed to save URL scan:', err);
    }

    res.json(response);
});

// --- Email analysis ---
router.post('/analyze_email', async (req, res) => {
    const { to, subject, message, notifyEmail } = req.body;
    if (!to && !subject && !message) return res.status(400).json({ error: 'Missing email data' });

    const result = analyzeEmail({ from: to, subject, body: message, headers: {} });
    const response = formatResponse({
        risk_score: result.risk_score,
        reasons: result.reasons,
        recommendation: result.risk_score > 70 ? 'Do NOT trust this email' : 'Verify sender before trusting',
        intel: result.intel
    });

    try {
        const scan = new ScanResult({
            type: 'email',
            input: { to, subject, message },
            risk_score: result.risk_score,
            reasons: result.reasons,
            recommendation: response.recommendation,
            intel: result.intel
        });
        await scan.save();
    } catch (err) {
        console.error('Failed to save email scan:', err);
    }

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

// --- History endpoint ---
router.get('/history', async (req, res) => {
    const { type } = req.query;

    try {
        const query = type ? { type } : {};
        const history = await ScanResult.find(query).sort({ createdAt: -1 }).limit(50);
        res.json(history);
    } catch (err) {
        console.error('Failed to fetch history:', err);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

module.exports = router;
