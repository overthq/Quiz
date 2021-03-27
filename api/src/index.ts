import express from 'express';
import './config/db';
import { wsServer } from './config/ws';

const app = express();

app.use(express.json());

const server = app.listen(Number(process.env.PORT), () => {
	console.log('Server running on port ', process.env.PORT);
});

server.on('upgrade', (request, socket, head) => {
	wsServer.handleUpgrade(request, socket, head, s => {
		wsServer.emit('connection', s, request);
	});
});
