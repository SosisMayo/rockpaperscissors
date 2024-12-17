// src/domain/entities/Transaction.js
class Transaction {
  constructor(id, userId, amount, type, date) {
    this.id = id; // Optional ID (null for new transactions)
    this.userId = userId; // ID of the user performing the transaction
    this.amount = amount; // Transaction amount
    this.type = type; // Transaction type: 'credit' or 'debit'
    this.date = date || new Date(); // Default to current date
  }
}

module.exports = Transaction;
