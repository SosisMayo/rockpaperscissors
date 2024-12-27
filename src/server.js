const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const env = require("./config/environment");
const { initializeDatabase } = require("./services/databaseService");
const { initializeSocket } = require("./infrastructure/sockets/socketServer");

const userRoutesV1 = require("./app/routes/v1/userRoutes");
const authRoutesV1 = require("./app/routes/v1/authRoutes");
const statisticRoutesV1 = require("./app/routes/v1/statisticRoutes");

const startServer = async () => {
  require("dotenv").config();
  console.log(process.env.PORT);
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.get("/api/v1/health", (req, res) => {
    res.status(200).json({ message: "Your API is Running Successfully" });
  });

  app.use("/api/v1/users", userRoutesV1);
  app.use("/api/v1/auth", authRoutesV1);
  app.use("/api/v1/statistics", statisticRoutesV1);

  const httpServer = createServer(app);
  const io = new Server(httpServer, { cors: { origin: "*" } });

  try {
    await initializeDatabase();
    initializeSocket(io);

    httpServer.listen(env.PORT, () => {
      console.log(`Server is running on http://localhost:${env.PORT}/api/v1`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
  }
};

module.exports = { startServer };
