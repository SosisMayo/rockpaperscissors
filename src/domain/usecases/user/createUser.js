// src/domain/usecases/user/createUser.js
const UserRepository = require("../../repositories/userRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../entities/User");
const userRepository = require("../../../infrastructure/repositories/userRepositoryImpl");

const create = async (userData) => {
  const existingUser = await userRepository.findByUsername(userData.username);
  if (existingUser) throw new Error("Username already exists");

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = new User(null, userData.username, hashedPassword);

  // Assign role (default is 'user', can be modified for admin, etc.)
  newUser.role = userData.role || "user";

  const createdUser = await userRepository.create(newUser);

  // Generate JWT
  const token = jwt.sign(
    { userId: createdUser.id, role: createdUser.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return { user: createdUser, token };
};

module.exports = { create };
