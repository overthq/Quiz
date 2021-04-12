import { createServer } from 'http';
import { Server } from 'socket.io';
import { Game, Player } from './models';
import { getQuestion } from './utils/questions';

const server = createServer();
const io = new Server(server, {});

io.on('connection', socket => {
	socket.on('create-game', input => {
		const game = new Game(input);
		socket.emit('game-created', { game });
	});

	socket.on('join-game', input => {
		const player = new Player(input);
		const rooms = [player.id, input.gameId];
		socket.join(rooms);
		socket.emit('game-joined', { player });
	});

	socket.on('start-game', async input => {
		const { gameId, rounds } = input;
		for (let i = 1; i <= rounds; i++) {
			const question = await getQuestion({ gameId, round: i });
			// Send the question to all clients.
			socket.to(gameId).emit('question', question);

			setTimeout(() => {
				// Not sure if this works.
				// I want to listen to a specific room.
				socket.on('answer-question', ({ playerId }) => {
					// Wait for timer to be over.
					// Send to only the player that answered the question.
					socket.to(playerId).emit('question-answered', { isCorrect: true });
					// Wait for 5 seconds
				});
			}, 10000);
		}
	});

	socket.on('answer-question', () => {
		// Answer question, set points and emit results
		// This has to be aware of the timer
		socket.emit('question-answered', { isCorrect: true });
	});
});

// Can we control the entire game flow from the server?
// i.e. Run the timer on the server, and make the frontend just respond to those changes?
// Ideally the Redux state will be constantly synchronized with the information from websockets.
// And then, handling reconnects won't be such a pain
// How does this arch help solve the problem with declaring a winner?
// Until I find a compelling way to handle this logic here, the current server implementation will stand.

// How the flow should work:
// - The "create" and "join" handlers should create and join the given socket room respectively, as well as create the game and the players needed.
// On "start game":
// - All users in the room should be sent the next (first) question, and a timer should be created.
// - On answering, the server should wait for the timer to run out, then show the answers to all users (this is to ensure that the answers are sent at the exact same time). This answer display portion should also be timed.
// - After the "answer and score reveal" timer is up (should not last more than 5 seconds), the server emits the next question to the room, and the loop continues.
// - In all of this, the server must keep track of the number of rounds in the game, to make sure that:
// - After the last question has been answered by all players, then:
// - The server computes the leaderboard, sends it to all players and transfers the winnings.
// It should be noted that at no stage in the sequence (until the "leaderboard" phase) should any user be aware of the score of the other users. This is to ensure that the flow is not complicated.
// This flow guarantees that the timer is run on the server only, and the frontend's state is only controlled by what events are emitted, instead of the current hybrid.

server.listen(Number(process.env.PORT));
