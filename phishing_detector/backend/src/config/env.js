// central env loader
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/phishdetect',
  NODE_ENV: process.env.NODE_ENV || 'development',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};
