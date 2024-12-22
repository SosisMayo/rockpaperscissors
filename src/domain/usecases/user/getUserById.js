const userRepository = require("../../../infrastructure/repositories/userRepositoryImpl");

const getUserById = async (userId) => {
  const user = await userRepository.getById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  const { password, ...userWithoutPassword } = user.dataValues;
  console.log(userWithoutPassword);
  return userWithoutPassword;
};

module.exports = { getUserById };
