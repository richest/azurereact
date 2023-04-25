const Joi = require("joi");

module.exports.signUp = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});

module.exports.validateLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});
