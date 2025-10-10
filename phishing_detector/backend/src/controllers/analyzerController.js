const analyzerService = require('../services/analyzerService');
const ScanResult = require('../db/models/ScanResult');

exports.analyzeUrl = async (req, res, next) => {
  try {
    console.log("🔹 Controller received URL:", req.body.url);
    const result = await analyzerService.analyzeUrl(req.body.url);
    res.json(result);
  } catch (err) {
    console.error("❌ Controller URL error:", err);
    next(err);
  }
};

exports.analyzeEmail = async (req, res, next) => {
  try {
    if (!req.body.email) return res.status(400).json({ success: false, message: "Email required" });
    console.log("🔹 Controller received email:", req.body.email);
    const result = await analyzerService.analyzeEmail(req.body.email);
    res.json(result);
  } catch (err) {
    console.error("❌ Controller Email error:", err);
    next(err);
  }
};
exports.getHistory = async (req, res) => {
  try {
    // optionally support pagination: page, limit
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const skip = (page - 1) * limit;

    const results = await ScanResult.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await ScanResult.countDocuments();

    res.json({ items: results, page, limit, total });
  } catch (err) {
    console.error('getHistory error', err);
    res.status(500).json({ message: 'Server error' });
  }
};