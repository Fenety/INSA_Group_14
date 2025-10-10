// Entry point
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors'); // added
const { connectDB } = require('./config/database');
const env = require('./config/env');
const analyzerRoutes = require('./routes/analyzerRoutes');
const { errorHandler } = require('./middlewares/errorHandler');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

const app = express();



// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(
  cors({
    origin: "http://localhost:3001", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

// Routes
app.use('/api/analyze', analyzerRoutes);


app.use((req, res, next) => {
  console.log('DEBUG HIT:', req.method, req.url);
  next();
});


// Healthcheck
app.get('/health', (req, res) => {
  console.log('>>> /health HIT');   // debug log
  res.json({ status: 'ok' });
});

// Error handler (last)
app.use(errorHandler);

// Start
async function start() {
  try {
    const mongoUri = process.env.MONGO_URI;
    logger.info(`Connecting to MongoDB: ${mongoUri}`);
    // Use mongoose directly instead of calling a possibly-missing connectDB helper
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    logger.info('MongoDB connected');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
  } catch (err) {
    logger.error(`Startup failed: ${err.message}`);
    process.exit(1);
  }
}

start();
