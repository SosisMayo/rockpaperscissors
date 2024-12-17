// src/app/controllers/transactionController.js
const Joi = require("joi");
const {
  createTransaction,
} = require("../../domain/usecases/transaction/createTransaction");
const {
  getTransaction,
} = require("../../domain/usecases/transaction/getTransaction");
const {
  updateTransaction,
} = require("../../domain/usecases/transaction/updateTransaction");
const {
  deleteTransaction,
} = require("../../domain/usecases/transaction/deleteTransaction");

const createTransactionController = async (req, res) => {
  const schema = Joi.object({
    userId: Joi.number().required(),
    amount: Joi.number().required(),
    status: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const transaction = await createTransaction(req.body);
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).send("Error creating transaction");
  }
};

const getTransactionController = async (req, res) => {
  const transactionId = req.params.id;
  try {
    const transaction = await getTransaction(transactionId);
    if (!transaction) return res.status(404).send("Transaction not found");
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).send("Error fetching transaction");
  }
};

const updateTransactionController = async (req, res) => {
  const transactionId = req.params.id;
  const schema = Joi.object({
    amount: Joi.number(),
    status: Joi.string(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updated = await updateTransaction(transactionId, req.body);
    if (!updated) return res.status(404).send("Transaction not found");
    res.status(200).send("Transaction updated");
  } catch (err) {
    res.status(500).send("Error updating transaction");
  }
};

const deleteTransactionController = async (req, res) => {
  const transactionId = req.params.id;
  try {
    const deleted = await deleteTransaction(transactionId);
    if (!deleted) return res.status(404).send("Transaction not found");
    res.status(200).send("Transaction deleted");
  } catch (err) {
    res.status(500).send("Error deleting transaction");
  }
};

module.exports = {
  createTransactionController,
  getTransactionController,
  updateTransactionController,
  deleteTransactionController,
};
