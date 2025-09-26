const log = (level, message, requestId = null) => {
  const timestamp = new Date().toISOString();
  const id = requestId ? `[${requestId}]` : '';
  console.log(`${timestamp} ${level.toUpperCase()} ${id}: ${message}`);
};

const info = (msg, requestId) => log('info', msg, requestId);
const warn = (msg, requestId) => log('warn', msg, requestId);
const error = (msg, requestId) => log('error', msg, requestId);

module.exports = { info, warn, error };
