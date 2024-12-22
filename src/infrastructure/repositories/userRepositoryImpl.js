const UserRepository = require("../../domain/repositories/userRepository");
const UserModel = require("../database/models/userModel");

class UserRepositoryImpl extends UserRepository {
  async create(user) {
    const createdUser = await UserModel.create({
      full_name: user.full_name,
      username: user.username,
      email: user.email,
      password: user.password,
      avatar_url: user.avatar_url,
      role: user.role,
      total_match: user.total_match,
      total_win: user.total_win,
      total_lose: user.total_lose,
      total_draw: user.total_draw,
      win_streak: user.win_streak,
      lose_streak: user.lose_streak,
      last_match: user.last_match,
      point: user.point,
    });
    return createdUser;
  }

  async getById(id) {
    return await UserModel.findByPk(id);
  }

  async findByUsername(username) {
    return await UserModel.findOne({ where: { username } });
  }

  async findByEmail(email) {
    return await UserModel.findOne({ where: { email } });
  }

  async findAll() {
    return await UserModel.findAll();
  }

  async updateUserById(id, updatedData) {
    await UserModel.update(updatedData, { where: { id } });
    const updatedUser = await UserModel.findByPk(id);
    const { password, ...userWithoutPassword } = updatedUser.dataValues;
    return userWithoutPassword;
  }

  async deleteUserById(id) {
    await UserModel.destroy({ where: { id } });
  }
}

module.exports = new UserRepositoryImpl();
