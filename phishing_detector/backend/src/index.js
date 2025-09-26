// src/index.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const analyzerRouter = require('./routes/analyzer');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Attach request ID to every request (useful later for logging)
app.use((req, res, next) => {
  req.requestId = uuidv4();
  res.setHeader('X-Request-ID', req.requestId);
  next();
});

// mount API routes under /api
app.use('/api', analyzerRouter);

// basic error handler
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] [${req.requestId}]`, err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    requestId: req.requestId
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
