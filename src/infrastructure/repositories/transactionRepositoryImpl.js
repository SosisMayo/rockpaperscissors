// src/infrastructure/repositories/transactionRepositoryImpl.js
const TransactionRepository = require("../../domain/repositories/transactionRepository");
const { Transaction } = require("../database/models");

class TransactionRepositoryImpl extends TransactionRepository {
  async create(transactionData) {
    const transaction = await Transaction.create(transactionData);
    return transaction;
  }

  async findAll() {
    const transactions = await Transaction.findAll();
    return transactions;
  }

  async findById(transactionId) {
    const transaction = await Transaction.findByPk(transactionId);
    return transaction;
  }

  async update(transactionId, transactionData) {
    const [updated] = await Transaction.update(transactionData, {
      where: { id: transactionId },
    });
    return updated;
  }

  async delete(transactionId) {
    const deleted = await Transaction.destroy({
      where: { id: transactionId },
    });
    return deleted;
  }
}

module.exports = TransactionRepositoryImpl;
