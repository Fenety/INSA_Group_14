const { errorResponse } = require('../utils/response');
const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  logger.error(err && err.stack ? err.stack : err);
  const status = err.status || 500;
  res.status(status).json(errorResponse('server_error', err.message || 'Internal server error'));
}

module.exports = { errorHandler };
