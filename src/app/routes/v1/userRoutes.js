// src/app/routes/userRoutes.js
const express = require("express");
const userController = require("../../controllers/userController");
const authenticateJWT = require("../../../infrastructure/middlewares/authMiddleware");
const authorize = require("../../../infrastructure/middlewares/authorizationMiddleware");
const userValidation = require("../../../validators/userValidation");
const { validate } = require("../../../infrastructure/middlewares/validate");

const router = express.Router();

router.post(
  "/",
  validate(userValidation.createUserSchema),
  userController.createUser
);

// // Only users with 'readProfile' permission can access this route
// router.get(
//   "/",
//   authenticateJWT,
//   authorize(["readProfile"]),
//   validate(userValidation.getProfileSchema),
//   userController.getProfile
// );

// // Only users with 'updateProfile' permission can access this route
// router.put(
//   "/",
//   authenticateJWT,
//   authorize(["updateProfile"]),
//   validate(userValidation.updateProfileSchema),
//   userController.updateProfile
// );

// // Only admin or moderator can delete a user
// router.delete(
//   "/:id",
//   authenticateJWT,
//   authorize(["deleteUser"]),
//   validate(userValidation.deleteUserSchema),
//   userController.deleteUser
// );

module.exports = router;
