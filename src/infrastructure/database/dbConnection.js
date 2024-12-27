const env = require("../../config/environment");

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const testDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Database connected successfully to ${env.DATABASE_URL}!`);
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, testDBConnection };
