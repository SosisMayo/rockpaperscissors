const bcrypt = require("bcryptjs");
const User = require("../../entities/User");
const userRepository = require("../../../infrastructure/repositories/userRepositoryImpl");
const {
  create: createStatisticUseCase,
} = require("../statistic/createStatistic");

const create = async (userData) => {
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

  await createStatisticUseCase.create(createdUser.id);

  return { user: createdUser };
};
module.exports = { create };
