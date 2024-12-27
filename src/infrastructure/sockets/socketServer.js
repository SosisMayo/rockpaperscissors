let rooms = {};

function initializeSocket(io) {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join-room", (roomId) => {
      handleJoinRoom(io, socket, roomId);
    });

    socket.on("finished-animation", ({ roomId }) => {
      handleFinishedAnimation(io, socket, roomId);
    });

    socket.on("player-move", ({ roomId, move }) => {
      handlePlayerMove(io, socket, roomId, move);
    });

    socket.on("deleteRoom", () => {
      handleDeleteRoom(socket);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      handleDeleteRoom(socket);
    });
  });
}

function handleJoinRoom(io, socket, roomId) {
  socket.join(roomId);

  if (!rooms[roomId]) {
    rooms[roomId] = {
      players: [],
      moves: {},
      scores: {},
      rounds: 0,
      roundInProgress: false,
      finishedAnimation: {},
    };
  }

  rooms[roomId].players.push(socket.id);
  rooms[roomId].scores[socket.id] = 0;

  console.log(`Player ${socket.id} joined room ${roomId}`);
  console.log("Current players in room:", rooms[roomId].players);

  if (rooms[roomId].players.length === 2) {
    console.log(`Room ${roomId} is full. Starting game...`);
    io.to(roomId).emit("start-game", "Game starting!");
    startRound(io, roomId);
  }

  if (rooms[roomId].players.length > 2) {
    console.log(`Room ${roomId} is full. Rejecting ${socket.id}`);
    socket.emit("room-full", "Room is already full. Please try another room.");
    socket.disconnect();
  }
}

function handleFinishedAnimation(io, socket, roomId) {
  if (!rooms[roomId]) {
    console.error(
      `Attempted to access a deleted or nonexistent room: ${roomId}`
    );
    return;
  }
  const room = rooms[roomId];
  room.finishedAnimation[socket.id] = true;
  console.log(`Player ${socket.id} finished animation in room ${roomId}`);

  if (Object.keys(room.finishedAnimation).length === 2) {
    if (room.rounds === 5) {
      handleGameEnd(io, roomId);
    } else {
      room.finishedAnimation = {};
      startRound(io, roomId);
    }
  }
}

function handlePlayerMove(io, socket, roomId, move) {
  const isPlayerOneWin = (moveOne, moveTwo) => {
    return (
      (moveOne === "rock" && moveTwo === "scissors") ||
      (moveOne === "paper" && moveTwo === "rock") ||
      (moveOne === "scissors" && moveTwo === "paper")
    );
  };

  const room = rooms[roomId];
  if (!room || !room.roundInProgress) {
    console.error(`Invalid move from player ${socket.id} in room ${roomId}`);
    return;
  }

  room.moves[socket.id] = move;
  console.log(`Player ${socket.id} made a move: ${move}`);

  if (Object.keys(room.moves).length === 2) {
    room.roundInProgress = false;

    const [playerOne, playerTwo] = room.players;
    const moveOne = room.moves[playerOne];
    const moveTwo = room.moves[playerTwo];

    let roundResult;
    let winner;

    if (moveOne === moveTwo) {
      roundResult = "draw";
    } else if (isPlayerOneWin(moveOne, moveTwo)) {
      roundResult = playerOne;
      room.scores[playerOne]++;
      winner = playerOne;
    } else {
      roundResult = playerTwo;
      room.scores[playerTwo]++;
      winner = playerTwo;
    }

    room.rounds++;
    const moves = room.moves;
    room.moves = {};

    io.to(roomId).emit("round-result", {
      roundResult,
      playersMove: moves,
      winnerSocketId: winner,
      scores: room.scores,
      rounds: room.rounds,
    });
  }
}

function startRound(io, roomId) {
  const room = rooms[roomId];
  if (!room) return;
  room.roundInProgress = true;
  const roundDuration = 5;
  io.to(roomId).emit("start-round", { roundDuration });
}

function handleGameEnd(io, roomId) {
  const room = rooms[roomId];
  const [playerOne, playerTwo] = room.players;
  const score1 = room.scores[playerOne];
  const score2 = room.scores[playerTwo];
  let gameResult;

  if (score1 === score2) {
    gameResult = "draw";
  } else if (score1 > score2) {
    gameResult = playerOne;
  } else {
    gameResult = playerTwo;
  }

  io.to(roomId).emit("game-result", {
    gameResult,
    winnerSocketId: gameResult,
    scores: room.scores,
  });

  delete rooms[roomId];
}

function handleDeleteRoom(socket) {
  for (const roomId in rooms) {
    const room = rooms[roomId];
    room.players = room.players.filter((id) => id !== socket.id);
    if (room.players.length === 0) {
      delete rooms[roomId];
    }
  }
}

module.exports = { initializeSocket };
