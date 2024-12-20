const express = require("express");
const authController = require("../../controllers/authController");
const authValidation = require("../../../validators/authValidation");
const { validate } = require("../../../infrastructure/middlewares/validate");

const router = express.Router();

router
  .route("/register")
  .post(validate(authValidation.registerValidation), authController.register);

router
  .route("/login")
  .post(validate(authValidation.loginValidation), authController.login);
module.exports = router;
