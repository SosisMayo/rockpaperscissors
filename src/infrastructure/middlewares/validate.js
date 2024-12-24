const Joi = require("joi");

const validate = (schema) => {
  return (req, res, next) => {
    const { body, query, params } = req;

    const validationParts = [];

    if (schema.body) validationParts.push({ type: "body", data: body });
    if (schema.query) validationParts.push({ type: "query", data: query });
    if (schema.params) validationParts.push({ type: "params", data: params });

    for (const part of validationParts) {
      const { error } = schema[part.type].validate(part.data);

      if (error) {
        return res.status(400).json({
          message: "Validation error",
          details: error.details,
        });
      }
    }

    next();
  };
};

module.exports = { validate };
