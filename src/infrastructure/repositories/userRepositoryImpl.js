const UserRepository = require("../../domain/repositories/userRepository");
const UserModel = require("../database/models/userModel");

class UserRepositoryImpl extends UserRepository {
  async create(user) {
    const createdUser = await UserModel.create({
      username: user.username,
      password: user.password,
    });
    return createdUser;
  }

  async getById(id) {
    return await UserModel.findByPk(id);
  }

  async findByUsername(username) {
    return await UserModel.findOne({ where: { username } });
  }
}

module.exports = new UserRepositoryImpl();
