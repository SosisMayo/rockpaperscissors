const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbConnection");

const UserModel = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "Username already exists",
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "Email already exists",
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar_url: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "user",
  },
});

module.exports = UserModel;
