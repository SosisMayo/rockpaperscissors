// src/domain/usecases/user/createUser.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../entities/User");
const userRepository = require("../../../infrastructure/repositories/userRepositoryImpl");

const register = async (userData) => {
  // Hashing Password
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  // Asign Avatar URL Default Ketika Gak Diinput
  if (!userData.avatar_url) {
    userData.avatar_url =
      "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";
  }

  const newUser = new User(
    null,
    userData.username,
    userData.email,
    hashedPassword,
    userData.avatar_url,
    userData.role
  );

  // Create User
  const createdUser = await userRepository.create(newUser);

  // Generate JWT
  const accessToken = jwt.sign(
    { userId: createdUser.id, role: createdUser.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
    }
  );

  // Generate JWT Refresh Token
  const refreshToken = jwt.sign(
    { userId: createdUser.id, role: createdUser.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_LIFETIME,
    }
  );

  return { user: createdUser, accessToken, refreshToken };
};

module.exports = { register };
