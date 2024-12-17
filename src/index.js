// src/index.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Importing versioned routes
const userRoutesV1 = require("./app/routes/v1/userRoutes");
const transactionRoutesV1 = require("./app/routes/v1/transactionRoutes");

app.use(bodyParser.json());

// Use versioned routes
app.use("/api/v1/users", userRoutesV1); // API versioning for user routes
app.use("/api/v1/transactions", transactionRoutesV1); // API versioning for transaction routes

// Optional: Add versioning for other routes (v2, etc.) in the future

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
