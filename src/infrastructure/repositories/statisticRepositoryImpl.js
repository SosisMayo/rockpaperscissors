const StatisticRepository = require("../../domain/repositories/statisticRepository");
const {
  StatisticModel,
  UserModel,
} = require("../database/models/associations");

class StatisticRepositoryImpl extends StatisticRepository {
  async create(data) {
    const createdStatistic = await StatisticModel.create({
      user_id: data.user_id,
      win: data.win,
      lose: data.lose,
      draw: data.draw,
      point: data.point,
      win_streak: data.win_streak,
    });
    return createdStatistic;
  }

  async getStatisticByUserId(userId) {
    const userStatistic = await StatisticModel.findOne({
      where: { user_id: userId },
    });
    return userStatistic;
  }

  async matchResult(userId, updatedData) {
    await StatisticModel.update(updatedData, {
      where: { user_id: userId },
    });
    const updatedStatistic = this.getStatisticByUserId(userId);
    return updatedStatistic;
  }

  async getRanking() {
    const userStatistics = await StatisticModel.findAll({
      include: [
        {
          model: UserModel,
          attributes: ["username", "avatar_url"],
        },
      ],
      order: [["point", "DESC"]],
    });
    return userStatistics;
  }
}

module.exports = new StatisticRepositoryImpl();
