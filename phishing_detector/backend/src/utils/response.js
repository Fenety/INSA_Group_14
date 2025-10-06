function successResponse(code = 'ok', data = {}) {
  return { success: true, code, data };
}

function errorResponse(code = 'error', message = '') {
  return { success: false, code, message };
}

module.exports = { successResponse, errorResponse };
