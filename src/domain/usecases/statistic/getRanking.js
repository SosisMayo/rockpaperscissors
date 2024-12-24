const StatisticRepository = require("../../../infrastructure/repositories/statisticRepositoryImpl");

const getRanking = async () => {
  const ranking = await StatisticRepository.getRanking();
  return ranking;
};

module.exports = { getRanking };
