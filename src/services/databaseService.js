const {
  sequelize,
  testDBConnection,
} = require("../infrastructure/database/dbConnection");

const initializeDatabase = async () => {
  await testDBConnection();
  await sequelize.sync({ alter: true });
  console.log("All models synchronized with the database!");
};

module.exports = { initializeDatabase };
