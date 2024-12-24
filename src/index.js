require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const {
  sequelize,
  testDBConnection,
} = require("./infrastructure/database/dbConnection");

const userRoutesV1 = require("./app/routes/v1/userRoutes");
const authRoutesV1 = require("./app/routes/v1/authRoutes");
const statisticRoutesV1 = require("./app/routes/v1/statisticRoutes");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Your API is Running Successfully",
  });
});
app.use("/api/v1/users", userRoutesV1);
app.use("/api/v1/auth", authRoutesV1);
app.use("/api/v1/statistic", statisticRoutesV1);

const startServer = async () => {
  const PORT = process.env.PORT || 3000;
  try {
    await testDBConnection();
    await sequelize.sync({ alter: true });
    console.log("✅ All models synchronized with the database!");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}/api/v1`);
    });
  } catch (error) {
    console.error("❌ Failed to start the server:", error.message);
  }
};

startServer();
