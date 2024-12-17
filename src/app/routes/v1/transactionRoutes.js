// src/app/routes/transactionRoutes.js
const express = require("express");
const router = express.Router();
const {
  createTransactionController,
  getTransactionController,
  updateTransactionController,
  deleteTransactionController,
} = require("../../controllers/transactionController");

router.post("/", createTransactionController);
router.get("/:id", getTransactionController);
router.put("/:id", updateTransactionController);
router.delete("/:id", deleteTransactionController);

module.exports = router;
