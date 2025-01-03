const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbConnection");
const UserModel = require("./userModel");

const HistoryModel = sequelize.define("MatchHistory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  room_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  player1: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  player2: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: UserModel,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  winner: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  score_player1: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  score_player2: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = HistoryModel;
