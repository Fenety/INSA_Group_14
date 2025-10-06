const Joi = require('joi');

const analyzeSchema = Joi.object({
  url: Joi.string().uri().allow('', null),
  email: Joi.any().allow('', null), // accept any content for email (no validation)
  html: Joi.string().allow('', null),
  headers: Joi.object().optional(),
  metadata: Joi.object().optional()
});



module.exports = { analyzeSchema };
