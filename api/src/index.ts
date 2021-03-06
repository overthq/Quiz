import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { Game, Player } from './models';
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
		const { gameId, rounds, address } = input;
		const game = await Game.findById(gameId);
		if (game.host !== address) {
			io.in(gameId).emit('permission-error', {
				message: 'Non-host attempted to create a new game'
			});
			return;
		}
		io.in(gameId).emit('game-started');

		for (let i = 1; i <= rounds + 1; i++) {
			setTimeout(async () => {
				if (i <= rounds) {
					const question = await getQuestion({ gameId, round: i });
					io.in(gameId).emit('question', { question, round: i });
				} else {
					const { leaderboard } = await finalizeGame(gameId);
					io.in(gameId).emit('leaderboard', leaderboard);
				}
			}, i * 15000);
		}
	});

	socket.on('answer-question', async input => {
		const data = await answerQuestion(input);
		io.in(input.playerId).emit('question-answered', data);
	});
});

server.listen(Number(process.env.PORT), () => {
	console.log('Server started at port', process.env.PORT);
});
