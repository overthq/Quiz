import { GameActionTypes, GameState, UPDATE_QUESTION } from './types';

const initialState: GameState = {
	loading: true,
	gameId: null,
	round: 1,
	currentQuestion: null,
	score: 0
};

const gameReducer = (state = initialState, action: GameActionTypes) => {
	switch (action.type) {
		case UPDATE_QUESTION:
			return {
				...state,
				round: state.round + 1,
				currentQuestion: action.payload.question
			};
		default:
			return state;
	}
};

export default gameReducer;
