export const INITIALIZE_GAME = 'game/INITIALIZE_GAME';
export const SET_ROUND_LOADING = 'game/SET_ROUND_LOADING';
export const UPDATE_QUESTION = 'game/UPDATE_QUESTION';
export const UPDATE_SCORE = 'game/UPDATE_SCORE';
export const COMPLETE_GAME = 'game/COMPLETE_GAME';
export const RESET_GAME = 'game/RESET_GAME';

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
	complete: boolean;
}

interface InitializeGameAction {
	type: typeof INITIALIZE_GAME;
	payload: {
		gameId: string;
		playerId: string;
	};
}

interface SetRoundLoadingAction {
	type: typeof SET_ROUND_LOADING;
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

interface CompleteGameAction {
	type: typeof COMPLETE_GAME;
}

interface ResetGameAction {
	type: typeof RESET_GAME;
}

export type GameActionTypes =
	| InitializeGameAction
	| SetRoundLoadingAction
	| UpdateQuestionAction
	| UpdateScoreAction
	| CompleteGameAction
	| ResetGameAction;
