// src/validators/userValidation.js
const Joi = require("joi");

// Validation for creating a new user (body)
const createUserValidation = {
  body: Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
};

// Validation for updating an existing user (body)
const updateUserValidation = {
  body: Joi.object({
    username: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(6),
  }),
};

// Validation for finding a user by ID (params)
const findUserByIdValidation = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

// Validation for querying users (query)
const queryUsersValidation = {
  query: Joi.object({
    limit: Joi.number().min(1).max(100),
    page: Joi.number().min(1),
  }),
};

module.exports = {
  createUserValidation,
  updateUserValidation,
  findUserByIdValidation,
  queryUsersValidation,
};
