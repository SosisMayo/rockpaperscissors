const express = require("express");
const authenticateJWT = require("../../../infrastructure/middlewares/authMiddleware");
const authorize = require("../../../infrastructure/middlewares/authorizationMiddleware");
const statisticController = require("../../controllers/statisticController");
const statisticValidation = require("../../../validators/statisticValidation");
const { validate } = require("../../../infrastructure/middlewares/validate");

const router = express.Router();

router
  .route("/")
  .post(
    authenticateJWT,
    authorize(["createStatistic"]),
    validate(statisticValidation.createStatisticValidation),
    statisticController.createStatistic
  );

router.route("/leaderboard").get(
  // authenticateJWT,
  // authorize(["readStatistic"]),
  statisticController.getRanking
);

router
  .route("/:user_id")
  .get(
    // authenticateJWT,
    // authorize(["readStatistic"]),
    validate(statisticValidation.getStatisticByUserIdValidation),
    statisticController.getStatisticByUserId
  )
  .patch(
    // authenticateJWT,
    // authorize(["updateStatistic"]),
    validate(statisticValidation.matchResultValidation),
    statisticController.matchResult
  );

module.exports = router;
