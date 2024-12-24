const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbConnection");
const UserModel = require("./userModel");

const StatisticModel = sequelize.define("Statistic", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  win: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  lose: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  draw: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  win_streak: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  point: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = StatisticModel;
