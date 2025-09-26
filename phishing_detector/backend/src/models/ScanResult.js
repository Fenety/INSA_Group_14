const mongoose = require('mongoose');

const scanResultSchema = new mongoose.Schema({
  type: { type: String, enum: ['url', 'email'], required: true },
  input: { type: Object, required: true },       // URL or Email input
  risk_score: { type: Number, required: true },
  reasons: { type: [String], default: [] },
  recommendation: { type: String },
  intel: { type: Object },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ScanResult', scanResultSchema);
