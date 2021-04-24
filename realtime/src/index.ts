import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import 'cross-fetch/polyfill';
import { Player } from './models';
import routes from './routes';
import { setupGame, answerQuestion, finalizeGame } from './utils/game';
import { getQuestion } from './utils/questions';
import './config/database';

const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST', 'OPTIONS']
	}
});

app.use(express.json());
app.use(cors());
app.use(routes);

// Learnt a lot from: https://github.com/ericterpstra/anagrammatix/blob/900f8ce5e1e0851e0fee89fa514642cfd71d147b/agxgame.js

io.on('connection', socket => {
	socket.on('setup-game', async input => {
		const data = await setupGame(input);
		await socket.join([data.playerId, data.gameId]);
		io.in(data.gameId).emit('game-created', data);
	});

	socket.on('join-game', async input => {
		const player = new Player(input);
		await Promise.all([player.save(), socket.join([player.id, input.gameId])]);
		io.in(input.gameId).emit('game-joined', { player });
	});

	socket.on('start-game', async input => {
		// Make sure the user is "authenticated", and is the creator of the game.
		const { gameId, rounds } = input;

		io.in(gameId).emit('game-started');

		for (let i = 1; i <= rounds; i++) {
			setTimeout(async () => {
				console.log('getting question ', i);
				const question = await getQuestion({ gameId, round: i });
				io.in(gameId).emit('question', question);
			}, i * 15000);

			// if (i === rounds) {
			// 	const { leaderboard } = await finalizeGame(gameId);
			// 	io.in(gameId).emit('leaderboard', leaderboard);
			// }
		}
	});

	socket.on('answer-question', async input => {
		const data = await answerQuestion(input);
		socket.emit('question-answered', data);
	});
});

server.listen(Number(process.env.PORT), () => {
	console.log('Server started at port', process.env.PORT);
});
