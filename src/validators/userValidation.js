const Joi = require("joi");

const createUserValidation = {
  body: Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    avatar_url: Joi.string(),
    role: Joi.string().valid("user", "admin").default("user"),
  }),
};

const getProfileValidation = {
  body: Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
  }),
};

const getUserById = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

const queryUsersValidation = {
  query: Joi.object({
    limit: Joi.number().min(1).max(100),
    page: Joi.number().min(1),
  }),
};

const updateUserByIdValidation = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    username: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    avatar_url: Joi.string(),
    role: Joi.string().valid("user", "admin"),
  }),
};

module.exports = {
  createUserValidation,
  getProfileValidation,
  getUserById,
  queryUsersValidation,
  updateUserByIdValidation,
};
