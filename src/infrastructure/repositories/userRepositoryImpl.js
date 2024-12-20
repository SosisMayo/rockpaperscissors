const UserRepository = require("../../domain/repositories/userRepository");
const UserModel = require("../database/models/userModel");

class UserRepositoryImpl extends UserRepository {
  async create(user) {
    const createdUser = await UserModel.create({
      full_name: user.full_name,
      username: user.username,
      email: user.email,
      password: user.password,
      account_number: user.account_number,
      balance: user.balance,
      phone_number: user.phone_number,
      avatar_url: user.avatar_url,
      role: user.role,
    });
    return createdUser;
  }

  async getById(id) {
    return await UserModel.findByPk(id);
  }

  async findByUsername(username) {
    return await UserModel.findOne({ where: { username } });
  }

  async findByAccountNumber(accountNumber) {
    return await UserModel.findOne({
      where: { account_number: accountNumber },
    });
  }

  async findAll() {
    return await UserModel.findAll();
  }
}

module.exports = new UserRepositoryImpl();
