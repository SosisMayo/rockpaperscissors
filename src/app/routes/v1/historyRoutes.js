// FIXME : History Routing Fixation
const express = require("express");
const historyController = require("../../controllers/historyController");
const historyValidation = require("../../../validators/historyValidation");
const { validate } = require("../../../infrastructure/middlewares/validate");

const router = express.Router();

router
  .route("/")
  .get(
    // authenticateJWT,
    // authorize(["readHistory"]),
    historyController.getAllHistories
  )
  .post(
    // authenticateJWT,
    // authorize(["createHistory"]),
    validate(historyValidation.createHistoryValidation),
    historyController.createHistory
  );

router.route("/:user_id").get(
  // authenticateJWT,
  // authorize(["readHistory"]),
  validate(historyValidation.getHistoryByUserIdValidation),
  historyController.getHistoryByUserId
);

module.exports = router;
