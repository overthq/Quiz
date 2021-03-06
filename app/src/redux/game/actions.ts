import { AppThunk } from '../store';
import {
	COMPLETE_GAME,
	SET_ROUND_LOADING,
	UPDATE_QUESTION,
	UPDATE_SCORE
} from './types';
import { fetchQuestion, sendAnswer } from '../../utils/game';

export const setNextQuestion = (): AppThunk => async (dispatch, getState) => {
	const {
		game: { gameId, round }
	} = getState();

	dispatch({ type: SET_ROUND_LOADING });

	try {
		if (gameId) {
			const question = await fetchQuestion({ gameId, round: round + 1 });
			dispatch({
				type: UPDATE_QUESTION,
				payload: { question }
			});
		} else {
			throw new Error('No gameId specified');
		}
	} catch (error) {
		console.log(error);
	}
};

export const answerQuestion = (option: string): AppThunk => async (
	dispatch,
	getState
) => {
	const {
		game: { gameId, playerId, round }
	} = getState();

	if (gameId && playerId) {
		const { data } = await sendAnswer({ gameId, playerId, round, option });
		dispatch({
			type: UPDATE_SCORE,
			payload: {
				score: data.score,
				isCorrect: data.isCorrect,
				correctAnswer: data.correctAnswer
			}
		});
	} else {
		throw new Error('gameId or playerId not specified');
	}
};

export const completeGame = (): AppThunk => async dispatch => {
	dispatch({ type: COMPLETE_GAME });
};
