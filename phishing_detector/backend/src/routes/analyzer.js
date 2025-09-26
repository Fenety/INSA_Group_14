const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const ScanResult = require('../models/ScanResult');
const { formatResponse } = require('../utils/response');
const { analyzeURL, analyzeEmail } = require('../services/heuristics');
const logger = require('../utils/logger'); // our custom logger

// --- URL analysis ---
router.post('/analyze_url', async (req, res) => {
    const { url } = req.body;
    logger.info(`Received URL scan request: ${url}`, req.requestId);

    if (!url) {
        logger.warn('Missing required field: url', req.requestId);
        return res.status(400).json({ error: 'Missing required field: url', requestId: req.requestId });
    }

    try {
        const result = analyzeURL(url);
        const response = formatResponse({
            risk_score: result.risk_score,
            reasons: result.reasons,
            recommendation: result.risk_score > 70 ? 'Do NOT click this link' : 'Proceed with caution',
            intel: result.intel
        });

        // Save to DB
        const scan = new ScanResult({
            type: 'url',
            input: { url },
            risk_score: result.risk_score,
            reasons: result.reasons,
            recommendation: response.recommendation,
            intel: result.intel
        });
        await scan.save();

        logger.info(`URL scan saved successfully: ${url}`, req.requestId);
        res.json(response);

    } catch (err) {
        logger.error(`URL analysis failed: ${err.message}`, req.requestId);
        res.status(500).json({ error: 'Internal server error', requestId: req.requestId });
    }
});

// --- Email analysis ---
router.post('/analyze_email', async (req, res) => {
    const { to, subject, message, notifyEmail } = req.body;
    logger.info(`Received email scan request: to=${to} subject=${subject}`, req.requestId);

    if (!to || !subject || !message) {
        logger.warn('Missing email data', req.requestId);
        return res.status(400).json({ error: 'Missing email data', requestId: req.requestId });
    }

    try {
        const result = analyzeEmail({ from: to, subject, body: message, headers: {} });
        const response = formatResponse({
            risk_score: result.risk_score,
            reasons: result.reasons,
            recommendation: result.risk_score > 70 ? 'Do NOT trust this email' : 'Verify sender before trusting',
            intel: result.intel
        });

        // Save to DB
        const scan = new ScanResult({
            type: 'email',
            input: { to, subject, message },
            risk_score: result.risk_score,
            reasons: result.reasons,
            recommendation: response.recommendation,
            intel: result.intel
        });
        await scan.save();
        logger.info(`Email scan saved successfully: ${to}`, req.requestId);

        // Optional notification
        if (notifyEmail) {
            try {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                });

                await transporter.sendMail({
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
                });

                logger.info(`Notification email sent to ${notifyEmail}`, req.requestId);
            } catch (emailErr) {
                logger.error(`Failed to send notification email: ${emailErr.message}`, req.requestId);
            }
        }

        res.json(response);

    } catch (err) {
        logger.error(`Email analysis failed: ${err.message}`, req.requestId);
        res.status(500).json({ error: 'Internal server error', requestId: req.requestId });
    }
});

// --- Fetch history ---
router.get('/history', async (req, res) => {
    const { type } = req.query;
    logger.info(`Fetching scan history, type=${type || 'all'}`, req.requestId);

    try {
        const query = type ? { type } : {};
        const history = await ScanResult.find(query).sort({ createdAt: -1 }).limit(50);
        res.json(history);
        logger.info(`Fetched ${history.length} records from history`, req.requestId);
    } catch (err) {
        logger.error(`Failed to fetch history: ${err.message}`, req.requestId);
        res.status(500).json({ error: 'Failed to fetch history', requestId: req.requestId });
    }
});

module.exports = router;
