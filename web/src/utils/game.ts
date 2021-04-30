export const getPlayers = async (gameId: string) => {
	const response = await fetch(
		`${process.env.REACT_APP_API_URL}/${gameId}/players`,
		{
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		}
	);
	const { data } = await response.json();
	return data;
};

export const getGameDetails = async (gameId: string) => {
	const response = await fetch(
		`${process.env.REACT_APP_API_URL}/${gameId}/details`,
		{
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		}
	);
	const { data } = await response.json();
	return data.game;
};
