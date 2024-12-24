const express = require("express");
const userController = require("../../controllers/userController");
const authenticateJWT = require("../../../infrastructure/middlewares/authMiddleware");
const authorize = require("../../../infrastructure/middlewares/authorizationMiddleware");
const userValidation = require("../../../validators/userValidation");
const { validate } = require("../../../infrastructure/middlewares/validate");

const router = express.Router();

router
  .route("/")
  .post(
    validate(userValidation.createUserValidation),
    userController.createUser
  )
  .get(authenticateJWT, authorize(["readProfile"]), userController.getAllUsers);

router
  .route("/:id")
  .get(
    authenticateJWT,
    authorize(["readProfile"]),
    validate(userValidation.getUserById),
    userController.getUserById
  )
  .patch(
    authenticateJWT,
    authorize(["updateProfile"]),
    validate(userValidation.updateUserByIdValidation),
    userController.updateUser
  )
  .delete(
    authenticateJWT,
    authorize(["deleteUser"]),
    validate(userValidation.getUserById),
    userController.deleteUser
  );

module.exports = router;
