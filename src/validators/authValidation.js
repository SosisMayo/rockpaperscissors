const Joi = require("joi");

const loginValidation = {
  body: Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).required(),
  }),
};

const registerValidation = {
  body: Joi.object({
    username: Joi.string().min(3).max(30).required(),
    full_name: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    phone_number: Joi.string().min(11).max(14).required(),
    avatar_url: Joi.string(),
    role: Joi.string().valid("user", "admin").default("user"),
  }),
};

module.exports = {
  loginValidation,
  registerValidation,
};
