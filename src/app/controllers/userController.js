const createUserUseCase = require("../../domain/usecases/user/createUser");
const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const createUser = async (req, res) => {
  try {
    const result = await createUserUseCase.create(req.body);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { createUser };
