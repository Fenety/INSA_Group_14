const { analyzeSchema } = require('../utils/validator');

function validateAnalyzeRequest(req, res, next) {
  const { error } = analyzeSchema.validate(req.body || {});
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  next();
}

module.exports = { validateAnalyzeRequest };
