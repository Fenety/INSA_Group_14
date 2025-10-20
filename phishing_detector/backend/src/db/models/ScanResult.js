// db/models/ScanResult.js
const mongoose = require("mongoose");

const ScanResultSchema = new mongoose.Schema({
  type: { type: String, required: true }, // 'url' or 'email'
  url: String,
  email: String,
  heuristicsScore: Number,
  mlScore: Number,
  score: Number,
  verdict: String,
  details: { type: Array, default: [] }, // <-- accept array of any type
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ScanResult", ScanResultSchema);
