import React from 'react';
import { socket } from '../utils/socket';

export interface Player {
	_id: string;
	nickname: string;
	address: string;
	score: number;
}

type RoundStatus =
	| {
			kind: 'correct';
			correctAnswer: never;
	  }
	| {
			kind: 'wrong';
			correctAnswer: string;
	  }
	| {
			kind: 'time-up';
			correctAnswer: never;
	  };

interface Question {
	question: string;
	options: string[];
}

interface GameState {
	gameId?: string;
	playerId?: string;
	score?: number;
	leaderboard?: Player[];
	status?: RoundStatus;
	question?: Question;
	round?: number;
	timeLeft?: number;
}

export const GameContext = React.createContext<{
	state: GameState;
	dispatch: (args: keyof Partial<GameState>) => void;
}>({
	state: {},
	dispatch: () => {
		/* noop */
	}
});

export const GameProvider: React.FC = ({ children }) => {
	const [state, dispatch] = React.useReducer(
		(p: any, n: any) => ({ ...p, ...n }),
		{
			gameId: undefined,
			playerId: undefined,
			score: undefined,
			leaderboard: undefined,
			status: undefined,
			question: undefined,
			round: undefined,
			timeLeft: undefined
		}
	);

	React.useEffect(() => {
		socket.on('question', ({ question, round }) => {
			dispatch({ question, round, timeLeft: 10, status: undefined });
		});

		socket.on('question-answered', payload => {
			if (payload.isCorrect) {
				dispatch({
					score: payload.score,
					status: { kind: 'correct' },
					timeLeft: undefined
				});
			} else {
				dispatch({
					score: payload.score,
					status: {
						kind: 'wrong',
						correctAnswer: payload.correctAnswer
					},
					timeLeft: undefined
				});
			}
		});

		socket.on('leaderboard', leaderboard => {
			dispatch({ leaderboard });
		});
	}, []);

	React.useEffect(() => {
		if (state.timeLeft === 0 && !state.status) {
			dispatch({ status: { kind: 'time-up' }, timeLeft: undefined });
		}
	}, [state.timeLeft, state.status]);

	React.useEffect(() => {
		if (state.timeLeft) {
			const timeout = setTimeout(() => {
				dispatch({ timeLeft: state.timeLeft - 1 });
			}, 1000);

			return () => clearTimeout(timeout);
		}
	});

	return (
		<GameContext.Provider value={{ state, dispatch }}>
			{children}
		</GameContext.Provider>
	);
};
