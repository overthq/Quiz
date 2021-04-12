import { createServer } from 'http';
import { Server } from 'socket.io';
import { Game, Player } from './models';

const server = createServer();
const io = new Server(server, {});

io.on('connection', socket => {
	socket.on('create-game', input => {
		const game = new Game(input);
		socket.emit('game-created', { game });
	});

	socket.on('join-game', input => {
		const player = new Player(input);
		socket.emit('game-joined', { player });
	});

	socket.on('start-game', input => {
		const { rounds } = input;
		const question = null;
		for (let i = 0; i < rounds; i++) {
			socket.emit('question', question);
		}
		// Emit the first question to everyone in the room.
	});

	socket.on('answer-question', () => {
		// Answer question, set points and emit results
	});
});

// Can we control the entire game flow from the server?
// i.e. Run the timer on the server, and make the frontend just respond to those changes?
// Ideally the Redux state will be constantly synchronized with the information from websockets.
// And then, handling reconnects won't be such a pain
// How does this arch help solve the problem with declaring a winner?
// Until I find a compelling way to handle this logic here, the current server implementation will stand.

server.listen(Number(process.env.PORT));
