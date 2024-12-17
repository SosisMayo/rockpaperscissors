// src/index.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const {
  sequelize,
  testDBConnection,
} = require("./infrastructure/database/dbConnection");
// Importing versioned routes
const userRoutesV1 = require("./app/routes/v1/userRoutes");

app.use(bodyParser.json());

// Use versioned routes
app.use("/api/v1/users", userRoutesV1); // API versioning for user routes

// Optional: Add versioning for other routes (v2, etc.) in the future

const startServer = async () => {
  const PORT = process.env.PORT || 3000;
  try {
    await testDBConnection();
    await sequelize.sync(); // Sync database models
    console.log("✅ All models synchronized with the database!");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start the server:", error.message);
  }
};

startServer();
