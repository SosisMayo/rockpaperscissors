const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../entities/User");
const userRepository = require("../../../infrastructure/repositories/userRepositoryImpl");
const statisticRepository = require("../../../infrastructure/repositories/statisticRepositoryImpl");

const register = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

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

  const createdUser = await userRepository.create(newUser);

  await statisticRepository.create({
    user_id: createdUser.dataValues.id,
    win: 0,
    lose: 0,
    draw: 0,
    point: 0,
    win_streak: 0,
  });

  const accessToken = jwt.sign(
    { userId: createdUser.id, role: createdUser.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
    }
  );

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
