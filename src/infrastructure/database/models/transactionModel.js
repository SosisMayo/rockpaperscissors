// src/infrastructure/database/models/transactionModel.js
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("Transaction", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Transaction.associate = (models) => {
    // Define any relationships if needed (e.g., user has many transactions)
    Transaction.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Transaction;
};
