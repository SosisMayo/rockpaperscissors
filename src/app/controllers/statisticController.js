const createStatisticUseCase = require("../../domain/usecases/statistic/createStatistic");
const getRankingUseCase = require("../../domain/usecases/statistic/getRanking");
const getStatisticByUserIdUseCase = require("../../domain/usecases/statistic/getStatisticByUserId");
const matchResultUseCase = require("../../domain/usecases/statistic/matchResult");

const createStatistic = async (req, res) => {
  try {
    const statistic = await createStatisticUseCase.create(req.body.user_id);
    res.status(201).json({
      success: true,
      message: "Statistic created successfully",
      data: {
        statistic,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRanking = async (req, res) => {
  try {
    const ranking = await getRankingUseCase.getRanking();
    res.status(200).json({
      success: true,
      message: "Ranking fetched successfully",
      data: {
        ranking,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStatisticByUserId = async (req, res) => {
  try {
    const statistic = await getStatisticByUserIdUseCase.getStatisticByUserId(
      req.params.user_id
    );
    res.status(200).json({
      success: true,
      message: "Statistic fetched successfully",
      data: {
        statistic,
      },
    });
  } catch (error) {
    if (error.message === "Statistic not found") {
      return res.status(404).json({
        success: false,
        message: "Statistic not found",
      });
    }
    res.status(500).json({ error: error.message });
  }
};

const matchResult = async (req, res) => {
  try {
    const statistic = await matchResultUseCase.matchResult(
      req.params.user_id,
      req.body.result
    );
    res.status(200).json({
      success: true,
      message: "Match result updated successfully",
      data: {
        statistic,
      },
    });
  } catch (error) {
    if (error.message === "Statistic not found") {
      return res.status(404).json({
        success: false,
        message: "Statistic not found",
      });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createStatistic,
  getRanking,
  getStatisticByUserId,
  matchResult,
};
