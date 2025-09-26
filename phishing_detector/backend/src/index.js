const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
require('dotenv').config();

const analyzerRouter = require('./routes/analyzer');
const logger = require('./utils/logger');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Attach request ID to every request
app.use((req, res, next) => {
  req.requestId = uuidv4();
  res.setHeader('X-Request-ID', req.requestId);
  next();
});

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI;
logger.info(`Connecting to MongoDB: ${mongoUri}`);
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('MongoDB connected'))
  .catch(err => logger.error(`MongoDB connection error: ${err.message}`));

// Mount routes
app.use('/api', analyzerRouter);

// Error handler
app.use((err, req, res, next) => {
  logger.error(err.message, req.requestId);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error', requestId: req.requestId });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
