export const getPlayers = async (gameId: string) => {
	const response = await fetch(`http://localhost:5050/${gameId}/players`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	});
	const { data } = await response.json();
	return data;
};

export const getGameDetails = async (gameId: string) => {
	const response = await fetch(`http://localhost:5050/${gameId}/details`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	});
	const { data } = await response.json();
	return data.game;
};
