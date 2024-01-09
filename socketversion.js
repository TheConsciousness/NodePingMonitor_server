const express = require('express');
const http = require('http');
const fs = require('fs');
const os = require('os');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET"],
    allowedHeaders: ["Access-Control-Allow-Origin"]
  }
});

// Socket calls
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

// HTTP calls
app.get('/', (req, res) => {
  const respHTML = "<h1>How to use</h1><p>Make a [GET] request to /ping/{currentEpochTimestamp}.</p><p>For example: /ping/1684730000</p>";
  res.end(respHTML);
});

app.get('/ping', (req, res) => {
  const respHTML = "<p>Don't forget to add the trailing current epoch timestamp.</p><p>For example: /ping/1684730000</p>";
  res.end(respHTML);
});

app.get('/ping/:timestamp', (req, res) => {
  const currentTimestamp = Date.now();
  const timestamp = req.params.timestamp;
  res.send(`${currentTimestamp - timestamp}`);
});

server.listen(PORT, () => {
  console.log(`Server is running on http://${os.hostname()}:${PORT}`);
});

module.exports = {app, server, io};