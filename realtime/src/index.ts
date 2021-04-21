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
		methods: ['GET', 'POST']
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
		socket.emit('game-created', data);
	});

	socket.on('join-game', async input => {
		const player = new Player(input);
		await player.save();
		await socket.join([player.id, input.gameId]);
		socket.to(input.gameId).emit('game-joined', { player });
	});

	socket.on('start-game', async input => {
		// Make sure the user is "authenticated", and is the creator of the game.
		const { gameId, rounds } = input;

		setTimeout(() => {
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
		}, 10000);
	});

	socket.on('answer-question', async input => {
		const data = await answerQuestion(input);
		socket.emit('question-answered', data);
	});
});

server.listen(Number(process.env.PORT), () => {
	console.log('Server started at port', process.env.PORT);
});
