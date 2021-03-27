import ws from 'ws';

export const wsServer = new ws.Server({ noServer: true });

wsServer.on('connection', socket => {
	socket.on('message', m => console.log(m));
});
