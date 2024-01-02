const express = require('express');
const http = require('http');
const fs = require('fs');


const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET"],
    secure: true,
    rejectUnauthorized: false, // This line is necessary for self-signed certificates
    allowedHeaders: ["Access-Control-Allow-Origin"]
  }
});

//app.use(express.static('client'));

io.on('connection', (socket) => {
  console.log('A user connected', socket.handshake.address);

  socket.on('ping', (timestamp) => {
    const pongTimestamp = Date.now();
    const pingTime = pongTimestamp - timestamp;
    socket.emit('pong', pingTime);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
