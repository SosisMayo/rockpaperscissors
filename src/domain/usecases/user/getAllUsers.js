const UserModel = require("../../../infrastructure/repositories/userRepositoryImpl");

const getAllUsers = async () => {
  const users = await UserModel.findAll();
  return users;
};

module.exports = { getAllUsers };
