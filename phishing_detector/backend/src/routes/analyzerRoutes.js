const express = require('express');
const router = express.Router();
const analyzerController = require('../controllers/analyzerController');
const { validateAnalyzeRequest } = require('../middlewares/validateRequest');

// URL and Email endpoints
router.post('/url', validateAnalyzeRequest, analyzerController.analyzeUrl);
router.post('/email', validateAnalyzeRequest, analyzerController.analyzeEmail);

module.exports = router;

