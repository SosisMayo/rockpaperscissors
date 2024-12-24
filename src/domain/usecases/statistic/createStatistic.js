const Statistic = require("../../entities/Statistic");
const StatisticRepository = require("../../../infrastructure/repositories/statisticRepositoryImpl");

const create = async (userId) => {
  const newStatistic = new Statistic(null, userId, 0, 0, 0, 0, null, 0);
  const createdStatistic = await StatisticRepository.create(newStatistic);
  return createdStatistic;
};

module.exports = { create };
