const StatisticRepository = require("../../../infrastructure/repositories/statisticRepositoryImpl");

const getStatisticByUserId = async (userId) => {
  const statistic = await StatisticRepository.getStatisticByUserId(userId);
  if (!statistic) {
    throw new Error("User statistic not found");
  }
  return statistic;
};

module.exports = { getStatisticByUserId };
