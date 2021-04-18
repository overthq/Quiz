import { AppThunk } from '../store';
import { UPDATE_QUESTION, UPDATE_SCORE } from './types';

export const setNextQuestion = (question: any): AppThunk => async dispatch => {
	dispatch({
		type: UPDATE_QUESTION,
		payload: { question }
	});
};

export const questionAnswered = (payload: any): AppThunk => async dispatch => {
	dispatch({ type: UPDATE_SCORE, payload });
};
