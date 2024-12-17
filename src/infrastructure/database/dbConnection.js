// src/infrastructure/database/dbConnection.js
const { Sequelize } = require("sequelize");
const config = require("../../config/dbConfig");

const sequelize = new Sequelize(config.databaseUrl, {
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;
