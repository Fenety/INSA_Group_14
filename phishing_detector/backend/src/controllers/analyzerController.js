const analyzerService = require('../services/analyzerService');

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