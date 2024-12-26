// TODO : Add Socket Server
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);

const {
  sequelize,
  testDBConnection,
} = require("./infrastructure/database/dbConnection");

const userRoutesV1 = require("./app/routes/v1/userRoutes");
const authRoutesV1 = require("./app/routes/v1/authRoutes");
const statisticRoutesV1 = require("./app/routes/v1/statisticRoutes");

app.use(cors());
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

  const rooms = {};

  try {
    await testDBConnection();
    await sequelize.sync({ alter: true });
    console.log("✅ All models synchronized with the database!");

    const io = new Server(httpServer, {
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      console.log("🚀 A user connected to the socket server!");

      socket.on("disconnect", () => {
        console.log("🚀 A user disconnected from the socket server!");
      });

      socket.on("join-room", (roomId) => {
        socket.join(roomId);

        if (!rooms[roomId]) {
          rooms[roomId] = {
            players: [],
            moves: {},
            scores: {},
            rounds: 0,
            roundInProgress: false,
          };
        }

        const roomData = rooms[roomId];

        if (roomData.players.length > 2) {
          console.log(`Room ${roomId} is full. Rejecting ${socket.id}`);
          socket.emit(
            "room-full",
            "Room is already full. Please try another room."
          );
          socket.disconnect();
        }

        roomData.players.push(socket.id);
        roomData.scores[socket.id] = 0;

        console.log(`Player ${socket.id} joined room ${roomId}`);
        console.log("Current players in room:", roomData.players);

        if (roomData.players.length === 2) {
          console.log(`Room ${roomId} is full. Starting game...`);
          io.to(roomId).emit("start-game", "Game starting!");
          startRound(roomId);
        }
      });
      socket.on("player-move", ({ roomId, move }) => {
        const room = rooms[roomId];
        if (!room || !room.roundInProgress) {
          console.error(
            `Invalid move from player ${socket.id} in room ${roomId}`
          );
          return;
        }

        room.moves[socket.id] = move;
        console.log(`Player ${socket.id} made a move: ${move}`);

        if (Object.keys(room.moves).length === 2) {
          room.roundInProgress = false;

          const [player1, player2] = room.players;
          const move1 = room.moves[player1];
          const move2 = room.moves[player2];

          let roundResult;
          let winner;

          if (move1 === move2) {
            roundResult = "draw";
          } else if (
            (move1 === "rock" && move2 === "scissors") ||
            (move1 === "paper" && move2 === "rock") ||
            (move1 === "scissors" && move2 === "paper")
          ) {
            roundResult = player1;
            room.scores[player1]++;
            winner = player1;
          } else {
            roundResult = player2;
            room.scores[player2]++;
            winner = player2;
          }

          room.rounds++;
          room.moves = {};

          io.to(roomId).emit("round-result", {
            roundResult,
            winnerSocketId: winner,
            scores: room.scores,
            rounds: room.rounds,
          });

          if (room.rounds === 5) {
            const score1 = room.scores[player1];
            const score2 = room.scores[player2];
            let gameResult;

            if (score1 === score2) {
              gameResult = "draw";
            } else if (score1 > score2) {
              gameResult = player1;
            } else {
              gameResult = player2;
            }

            io.to(roomId).emit("game-result", {
              gameResult,
              winnerSocketId: gameResult,
              scores: room.scores,
            });
            delete rooms[roomId];
          } else {
            startRound(roomId);
          }
        }
      });
      function startRound(roomId) {
        const room = rooms[roomId];
        if (!room) return;
        room.roundInProgress = true;
        const roundDuration = 5;
        io.to(roomId).emit("start-round", { roundDuration: roundDuration });
      }

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        for (const roomId in rooms) {
          const room = rooms[roomId];
          room.players = room.players.filter((id) => id !== socket.id);
          if (room.players.length === 0) {
            delete rooms[roomId];
          }
        }
      });
    });

    httpServer.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}/api/v1`);
    });
  } catch (error) {
    console.error("❌ Failed to start the server:", error.message);
  }
};

startServer();
