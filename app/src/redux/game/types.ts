export const INITIALIZE_GAME = 'game/INITIALIZE_GAME';
export const UPDATE_QUESTION = 'game/UPDATE_QUESTION';
export const UPDATE_SCORE = 'game/UPDATE_SCORE';

export interface Question {
	question: string;
	options: string[];
}

export interface GameResult {
	isCorrect: boolean;
	correctAnswer: string;
}

export interface GameState {
	loading: boolean;
	gameId: string | null;
	playerId: string | null;
	round: number;
	question: Question | null;
	score: number;
	result: GameResult | null;
}

interface InitializeGameAction {
	type: typeof INITIALIZE_GAME;
	payload: {
		gameId: string;
		playerId: string;
	};
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
	payload: {
		score: number;
		isCorrect: boolean;
		correctAnswer: string;
	};
}

export type GameActionTypes =
	| InitializeGameAction
	| UpdateQuestionAction
	| UpdateScoreAction;
