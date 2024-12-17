// src/domain/repositories/transactionRepository.js
class TransactionRepository {
  async create(transactionData) {
    throw new Error("create method must be implemented");
  }

  async findAll() {
    throw new Error("findAll method must be implemented");
  }

  async findById(transactionId) {
    throw new Error("findById method must be implemented");
  }

  async update(transactionId, transactionData) {
    throw new Error("update method must be implemented");
  }

  async delete(transactionId) {
    throw new Error("delete method must be implemented");
  }
}

module.exports = TransactionRepository;
