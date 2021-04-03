import {
	GameActionTypes,
	GameState,
	INITIALIZE_GAME,
	UPDATE_QUESTION,
	UPDATE_SCORE
} from './types';

const initialState: GameState = {
	loading: true,
	gameId: null,
	playerId: null,
	round: 0,
	question: null,
	score: 0,
	result: null
};

const gameReducer = (state = initialState, action: GameActionTypes) => {
	switch (action.type) {
		case INITIALIZE_GAME:
			return {
				...state,
				gameId: action.payload.gameId,
				playerId: action.payload.playerId
			};
		case UPDATE_QUESTION:
			return {
				...state,
				round: state.round + 1,
				question: action.payload.question,
				result: null
			};
		case UPDATE_SCORE:
			return {
				...state,
				score: action.payload.score,
				result: {
					isCorrect: action.payload.isCorrect,
					correctAnswer: action.payload.CorrectAnswer
				}
			};
		default:
			return state;
	}
};

export default gameReducer;
