const Joi = require("joi");

const createStatisticValidation = {
  body: Joi.object({
    user_id: Joi.number().required(),
  }),
};

const getStatisticByUserIdValidation = {
  params: Joi.object({
    user_id: Joi.number().required(),
  }),
};

const matchResultValidation = {
  params: Joi.object({
    user_id: Joi.number().required(),
  }),
  body: Joi.object({
    result: Joi.string().valid("win", "lose", "draw").required(),
  }),
};

module.exports = {
  createStatisticValidation,
  getStatisticByUserIdValidation,
  matchResultValidation,
};
