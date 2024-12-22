const UserModel = require("../../../infrastructure/repositories/userRepositoryImpl");

const getAllUsers = async () => {
  const users = await UserModel.findAll();
  const filteredUsers = users.map((user) => {
    const { password, ...userWithoutPassword } = user.dataValues;
    return userWithoutPassword;
  });
  console.log(filteredUsers);
  return filteredUsers;
};

module.exports = { getAllUsers };
