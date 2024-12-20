const Joi = require("joi");

const loginValidation = {
  body: Joi.object({
    username: Joi.string().min(3).max(30),
    email: Joi.string(),
    password: Joi.string().min(8).required(),
  }).xor("username", "email"),
};

const registerValidation = {
  body: Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    avatar_url: Joi.string(),
    role: Joi.string().valid("user", "admin").default("user"),
  }),
};

module.exports = {
  loginValidation,
  registerValidation,
};
