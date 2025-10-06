const mongoose = require('mongoose');

const ScanResultSchema = new mongoose.Schema({
  type: { type: String, required: true }, // "url" or "email"
  url: { type: String },
  email: { type: String },
  heuristicsScore: { type: Number, default: 0 },
  mlScore: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  verdict: { type: String, default: 'unknown' },
  details: { type: [String], default: [] }, // triggered heuristics
}, { timestamps: true });

module.exports = mongoose.model('ScanResult', ScanResultSchema);
