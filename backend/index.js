// backend/index.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 5000;

// Serve static files (if needed)
app.use(express.static('public'));

// Handle socket connections
io.on('connection', (socket) => {
  console.log('New client connected');

  // Handle game moves
  socket.on('move', (moveData) => {
    // Broadcast the move to other players
    socket.broadcast.emit('move', moveData);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
