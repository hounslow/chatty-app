// server.js
const uuid = require('uuid/v4');
const express = require('express');
const http = require('http');
const ws = require('ws');

// Create a new express server
const app = express()

const server = http.createServer(app);

const wss = new ws.Server({server});

// Create the WebSockets server

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(data);
    }
  });
};

// Broadcast current user count
const countUsers = () => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === 1) {
      client.send(JSON.stringify({type:'count', userCount: wss.clients.size}));
    }
  });
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (socket) => {
  console.log('Client connected');
  countUsers();

  socket.on('message', (message) => {
    const receivedMessage = JSON.parse(message);
    let messageObject;

    if (receivedMessage.type === 'postMessage'){
      console.log(`User ${receivedMessage.username} said ${receivedMessage.content}`);
      messageObject = {
        type: "incomingMessage",
        key: uuid(),
        username: receivedMessage.username,
        content: receivedMessage.content
      };
    }
    if (receivedMessage.type === 'postUpdate'){
      const updateResponse = `User ${receivedMessage.pastUser} changed their name to ${receivedMessage.newUser}`;
      messageObject = {
        type: "incomingUpdate",
        key: uuid(),
        username: "UPDATE:",
        content: updateResponse,
      };
    }
    wss.broadcast(JSON.stringify(messageObject));
  });

  socket.on('close', () => {
    countUsers();
    console.log('Client disconnected');
  });
});

server.listen(3001, () => {
  console.log('Server listening on ', server.address().port);
});
