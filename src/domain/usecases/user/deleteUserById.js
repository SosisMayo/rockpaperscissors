const userRepository = require("../../../infrastructure/repositories/userRepositoryImpl");

const deleteUserById = async (id) => {
  const user = await userRepository.getById(id);
  if (!user) {
    throw new Error("User not found");
  }
  await userRepository.deleteUserById(id);
};

module.exports = { deleteUserById };
