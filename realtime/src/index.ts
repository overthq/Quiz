import { createServer } from 'http';
import { Server } from 'socket.io';
import { Player } from './models';
import { setupGame, answerQuestion, finalizeGame } from './utils/game';
import { getQuestion } from './utils/questions';

const server = createServer();
const io = new Server(server, {});

io.on('connection', socket => {
	socket.on('setup-game', async input => {
		const game = await setupGame(input);
		socket.emit('game-created', { game });
	});

	socket.on('join-game', input => {
		const player = new Player(input);
		const rooms = [player.id, input.gameId];
		socket.join(rooms);
		socket.emit('game-joined', { player });
	});

	socket.on('start-game', async input => {
		// Make sure the user is "authenticated", and is the creator of the game.
		const { gameId, rounds } = input;
		let i = 1;
		const interval = setInterval(async () => {
			const question = await getQuestion({ gameId, round: i });
			socket.to(gameId).emit('question', question);

			if (i === rounds) clearInterval(interval);
			i++;
		}, 15000);

		setTimeout(async () => {
			const { leaderboard } = await finalizeGame(gameId);
			socket.to(gameId).emit('leaderboard', leaderboard);
		}, 17500);
	});

	socket.on('answer-question', async input => {
		const data = await answerQuestion(input);
		socket.emit('question-answered', data);
	});
});

server.listen(Number(process.env.PORT));
