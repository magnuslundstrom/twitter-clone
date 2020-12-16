const express = require('express');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });
const rooms = {};

wss.on('connection', (ws, req) => {
  const convId = req.url.split('=')[1];
  rooms[convId] = rooms[convId] || [];
  rooms[convId].push(ws);

  // ws.send(JSON.stringify({ text: 'hej', type: 'receiveMessage' }));
  //
  ws.on('message', function (message) {
    wss.clients.forEach(function (client) {
      if (client.readyState === WebSocket.OPEN && rooms[convId].includes(client) && client !== ws) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    rooms[convId] = rooms[convId].filter((user) => user !== ws);
    if (rooms[convId].length === 0) {
      delete rooms[convId];
    }
  });
});

app.get('/', (req, res) => {
  res.send('hello world');
});

server.listen(3001, () => console.log('listening @3001'));
