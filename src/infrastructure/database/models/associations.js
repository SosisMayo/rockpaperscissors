const UserModel = require("./userModel");
const StatisticModel = require("./statisticModel");

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

module.exports = {
  UserModel,
  StatisticModel,
};
