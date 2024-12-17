const { Sequelize } = require("sequelize");
const dbConfig = require("../../config/dbConfig");

const env = process.env.NODE_ENV || "development";
const config = dbConfig.development;

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

// Function to test the connection
const testDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `✅ Database connected successfully to ${config.database} on ${config.host}`
    );
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, testDBConnection };
