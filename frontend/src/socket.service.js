import { io } from 'socket.io-client';
//socket url
const url= 'http://www.localhost:3002'
let socket;

export const initiateSocketConnection = (room) => {
  socket = io(url, {
	});
	console.log(`Connecting socket...`);
}

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}

export const joinSocket = (cb) => {
	socket.emit('my message', 'Hello there from React.');
    if (!socket) return(true);
    socket.on('my broadcast', msg => {
        console.log('Websocket event received!');
        return cb(null, msg);
    });
    socket.on('board', (data)=>{
    });
}

export const sendMessage = (message) => {
  if (socket) socket.emit('chat', { message});
}