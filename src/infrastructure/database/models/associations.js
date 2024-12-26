const UserModel = require("./userModel");
const StatisticModel = require("./statisticModel");
const HistoryModel = require("./historyModel");

UserModel.hasOne(StatisticModel, {
  foreignKey: "user_id",
  sourceKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

StatisticModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

UserModel.hasMany(HistoryModel, {
  foreignKey: "player1",
  sourceKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

UserModel.hasMany(HistoryModel, {
  foreignKey: "player2",
  sourceKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

HistoryModel.belongsTo(UserModel, {
  foreignKey: "player1",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

HistoryModel.belongsTo(UserModel, {
  foreignKey: "player2",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = {
  UserModel,
  StatisticModel,
  HistoryModel,
};
