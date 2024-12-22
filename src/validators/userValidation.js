// src/validators/userValidation.js
const Joi = require("joi");

// Validation for creating a new user (body)
const createUserValidation = {
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

const getProfileValidation = {
  body: Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
  }),
};

// Validation for finding a user by ID (params)
const getUserById = {
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

const updateUserByIdValidation = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    username: Joi.string().min(3).max(30),
    full_name: Joi.string().min(5),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    phone_number: Joi.string().min(11).max(14),
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
