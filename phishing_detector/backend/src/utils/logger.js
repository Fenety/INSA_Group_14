// minimal logger abstraction using console (can be swapped for winston)
const env = require('../config/env');

function info(...args) {
  if (['info', 'debug'].includes(env.LOG_LEVEL)) console.log('[INFO]', ...args);
}

function debug(...args) {
  if (env.LOG_LEVEL === 'debug') console.log('[DEBUG]', ...args);
}

function error(...args) {
  console.error('[ERROR]', ...args);
}

module.exports = { info, debug, error };
