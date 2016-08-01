import express from 'express';
import http from 'http';
import socket from 'socket.io';
import serviceLocator from './container';

const app = express();
const server = http.Server(app);
const io = socket(server);

const clients = {};
const clientsByClientId = {};

serviceLocator()
  .then((container) => {
    io.on('connection', (socket) => {
      clients[socket.id] = {
        socket,
        clientId: null,
      };

      console.log('user connected');
      console.log('clients: ', Object.keys(clients).length);

      socket.emit('connection', { hello: 'world' });

      socket.on('register', ({ clientId }) => {
        console.log(`user registered with client ID ${clientId}`);
        clients[socket.id].clientId = clientId;
        clientsByClientId[clientId] = socket;
      });

      socket.on('disconnect', () => {
        delete clientsByClientId[clients[socket.id].clientId];
        delete clients[socket.id];

        console.log('user disconnected');
        console.log('clients: ', Object.keys(clients).length);
      });
    });

    console.log('Starting consumer');
    const rabbitMq = container.rabbitMq;
    rabbitMq.consume((data) => {
      console.log('Consuming', data);

      if (clientsByClientId[data.clientId] !== undefined) {
        console.log(`Sending to client ${data.clientId}`);
        const socket = clientsByClientId[data.clientId];
        socket.emit('graphql-changes', data);
      }
    });

    server.listen(process.env.PORT || 3001, () => {
      const { address, port } = server.address();
      console.log(`wss server listening at ${address} on port ${port}`);
    });

  });
