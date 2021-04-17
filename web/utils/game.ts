interface SetupGamePayload {
	nickname: string;
	address: string;
	stake: string;
	difficulty?: 'easy' | 'medium' | 'hard';
	category?: number;
	rounds?: string;
}

export const setupGame = async (options: SetupGamePayload) => {
	try {
		const response = await fetch('http://localhost:5050/setup', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(options)
		});
		const { data } = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

interface StartGamePayload {
	address: string;
	gameId: string;
}

export const startGame = async ({ address, gameId }: StartGamePayload) => {
	try {
		const response = await fetch('/games/${gameId}/start', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ address, gameId })
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

interface JoinGamePayload {
	gameId: string;
	address: string;
}

export const joinGame = async ({ gameId, address }: JoinGamePayload) => {
	try {
		const response = await fetch('', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ gameId, address })
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

interface FetchQuestionPayload {
	gameId: string;
	round: number;
}

export const fetchQuestion = async ({
	gameId,
	round
}: FetchQuestionPayload) => {
	const response = await fetch(
		`http://localhost:5050/question/${gameId}/${round}`,
		{
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		}
	);
	const data = await response.json();
	return data;
};

interface SendAnswerPayload {
	gameId: string;
	playerId: string;
	round: number;
	option: string;
}

export const sendAnswer = async ({
	gameId,
	playerId,
	round,
	option
}: SendAnswerPayload) => {
	const response = await fetch(
		`http://localhost:5050/answer/${gameId}/${round}`,
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ gameId, playerId, round, option })
		}
	);
	const data = await response.json();
	return data;
};
