const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../../../infrastructure/repositories/userRepositoryImpl");
const environment = require("../../../config/environment");

const login = async (loginData) => {
  let user;
  if (loginData.username) {
    user = await userRepository.findByUsername(loginData.username);
  } else if (loginData.email) {
    user = await userRepository.findByEmail(loginData.email);
  }
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await bcrypt.compare(
    loginData.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new Error("Invalid Credentials");
  }

  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    environment.JWT_SECRET,
    {
      expiresIn: environment.ACCESS_TOKEN_LIFETIME,
    }
  );

  const refreshToken = jwt.sign(
    { userId: user.id, role: user.role },
    environment.JWT_SECRET,
    {
      expiresIn: environment.REFRESH_TOKEN_LIFETIME,
    }
  );

  return { user, accessToken, refreshToken };
};

module.exports = { login };
