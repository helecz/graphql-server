import io from 'socket.io-client';
import uuid from 'node-uuid';

const port = process.env.PORT || 3001;
const socket = io(`http://localhost:${port}`);
const clientId = uuid.v4();

socket.on('connection', (data) => {
  socket.emit('register', { clientId });
  console.log(`Registered with client ID ${clientId}`);
});

socket.on('graphql-changes', (data) => {
  console.log(data);
});
