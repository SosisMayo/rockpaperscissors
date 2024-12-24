const StatisticRepository = require("../../../infrastructure/repositories/statisticRepositoryImpl");

const matchResult = async (userId, matchResult) => {
  const userStatistic = await StatisticRepository.getStatisticByUserId(userId);
  let updatedData = {};
  if (!userStatistic) {
    throw new Error("User statistic not found");
  }
  if (matchResult === "win") {
    updatedData.win = userStatistic.win + 1;
    updatedData.win_streak = userStatistic.win_streak + 1;
    // FIXME Point Calculation Fixation
    updatedData.point = userStatistic.point + 3 + userStatistic.win_streak * 3;
  } else if (matchResult === "lose") {
    updatedData.lose = userStatistic.lose + 1;
    updatedData.win_streak = 0;
  } else if (matchResult === "draw") {
    updatedData.draw = userStatistic.draw + 1;
    updatedData.win_streak = 0;
    updatedData.point = userStatistic.point + 1;
  }
  const updatedStatistic = await StatisticRepository.matchResult(
    userId,
    updatedData
  );
  return updatedStatistic;
};

module.exports = { matchResult };
