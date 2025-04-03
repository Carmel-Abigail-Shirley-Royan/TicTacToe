const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let currentBoard = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];

io.on("connection", (socket) => {
  console.log("A user connected");

  // When a player makes a move, broadcast the new board state to the other player
  socket.on("move", (newBoard) => {
    currentBoard = newBoard;
    socket.broadcast.emit("move", newBoard); // Send the move to the other player
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
