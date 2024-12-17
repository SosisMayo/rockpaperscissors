// src/domain/usecases/transaction/createTransaction.js
const TransactionRepository = require("../../repositories/transactionRepository");
const Transaction = require("../../entities/Transaction");
const transactionRepository = require("../../../infrastructure/repositories/transactionRepositoryImpl");

const createTransaction = async (transactionData) => {
  // Business logic: Create a Transaction entity
  const transaction = new Transaction(
    null, // ID will be auto-generated
    transactionData.userId,
    transactionData.amount,
    transactionData.type
  );

  // Save the transaction to the repository
  const newTransaction = await transactionRepository.create(transaction);

  return newTransaction;
};

module.exports = { createTransaction };
