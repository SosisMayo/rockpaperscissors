const bcrypt = require("bcryptjs");
const userRepository = require("../../../infrastructure/repositories/userRepositoryImpl");

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
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid Credentials");
  }

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

  return { user, accessToken, refreshToken };
};

module.exports = { login };
