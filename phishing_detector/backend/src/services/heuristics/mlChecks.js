const axios = require('axios');
const ML_API_URL = process.env.ML_API_URL || 'http://localhost:8000';

exports.evaluateUrl = async (url) => {
  try {
    const payload = { type: 'url', content: url };
    console.log("📤 Sending URL to ML API:", payload);
    const res = await axios.post(`${ML_API_URL}/predict`, payload);
    return res.data.score;
  } catch (e) {
    console.error("ML URL error:", e.message);
    return 0.5;
  }
};

exports.evaluateEmail = async (email) => {
  try {
    const payload = { type: 'email', content: email };
    console.log("📤 Sending Email to ML API:", payload);
    const res = await axios.post(`${ML_API_URL}/predict`, payload);
    return res.data.score;
  } catch (e) {
    console.error("ML Email error:", e.message);
    return 0.5;
  }
};
