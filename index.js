const express = require('express');
const http = require('http');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*'
}));

const server = http.createServer(app);

app.get('/ping/:timestamp', (req, res) => {
    const currentTimestamp = Date.now();
    const timestamp = req.params.timestamp;
    res.send(`${currentTimestamp - timestamp}`);
});

server.listen(process.env.PORT || 3001, () => {
    console.log('Server is listening on port 3001');
})