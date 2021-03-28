export const UPDATE_QUESTION = 'game/UPDATE_QUESTION';
export const UPDATE_SCORE = 'game/UPDATE_SCORE';

export interface Question {
	question: string;
	options: string[];
}

export interface GameState {
	loading: boolean;
	gameId: string | null;
	round: number;
	currentQuestion: Question | null;
	score: number;
}

interface UpdateQuestionAction {
	type: typeof UPDATE_QUESTION;
	payload: {
		round: number;
		question: Question;
	};
}

interface UpdateScoreAction {
	type: typeof UPDATE_SCORE;
	payload: { score: number };
}

export type GameActionTypes = UpdateQuestionAction | UpdateScoreAction;
