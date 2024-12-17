// src/app/middlewares/validate.js
const Joi = require("joi");

const validate = (schema) => {
  return (req, res, next) => {
    const { body, query, params } = req;

    // Determine which part of the request should be validated
    const validationParts = [];

    if (schema.body) validationParts.push({ type: "body", data: body });
    if (schema.query) validationParts.push({ type: "query", data: query });
    if (schema.params) validationParts.push({ type: "params", data: params });

    // Validate the relevant parts of the request
    for (const part of validationParts) {
      const { error } = schema[part.type].validate(part.data);

      if (error) {
        return res.status(400).json({
          message: "Validation error",
          details: error.details,
        });
      }
    }

    next(); // Validation passed, move to the next middleware or controller
  };
};

module.exports = { validate };
