interface CreateGamePayload {
	creator: string;
	difficulty?: 'easy' | 'medium' | 'hard';
	category?: number;
}

export const createGame = async ({
	creator,
	difficulty,
	category
}: CreateGamePayload) => {
	try {
		const response = await fetch('/games/new', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ creator, difficulty, category })
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

// Make a call to the server, that sets a status on the game and broadcasts said status to all listeners
// This should be a good pattern:
// * Persist only necessary things, and then broadcast live data.
// * If a client loses connection, their state can be rehydrated from the persisted data.
//
// Since all the information on the games is cleared when the game ends, we can:
// - Rehydrate state, just by checking if there's any record of the user's address in the database.
// - Consequently not worry as much about disconnections.
//
// One other thing to figure out is how to know when the game ends.
// This will require a clever combination of REST endpoints and websockets.
// Or do we just brute-force it?
// That is, check if there are still people who have not completed the game, when someone does complete the game?
// That will actually not work, since there is the chance that people might get disconnected during the game.
// Maybe we have to introduce a disconnection policy, which has to be in the Ts & Cs.

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

export const updateScore = () => {};
