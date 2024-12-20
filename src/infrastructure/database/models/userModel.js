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
    unique: true,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  account_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  phone_number: {
    type: DataTypes.STRING,
    unique: true,
  },
  avatar_url: {
    type: DataTypes.STRING,
  },
  role: {
    // Add role field
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "user", // Default to 'user' role
  },
});

module.exports = UserModel;
