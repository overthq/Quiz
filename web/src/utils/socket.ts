import io from 'socket.io-client';

export const socket = io('http://localhost:5050', {
	transports: ['websocket']
});
