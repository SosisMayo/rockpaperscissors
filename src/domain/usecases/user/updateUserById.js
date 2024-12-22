const userRepository = require("../../../infrastructure/repositories/userRepositoryImpl");

const updateUserById = async (id, updatedData) => {
  const user = await userRepository.getById(id);
  if (!user) {
    throw new Error("User not found");
  }
  if (updatedData.username) {
    const existingUser = await userRepository.findByUsername(
      updatedData.username
    );
    if (existingUser) {
      throw new Error("Username already in use");
    }
  }
  if (updatedData.email) {
    const existingUser = await userRepository.findByEmail(updatedData.email);
    if (existingUser) {
      throw new Error("Email already in use");
    }
  }
  return await userRepository.updateUserById(id, updatedData);
};

module.exports = { updateUserById };
