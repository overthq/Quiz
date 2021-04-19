import React from 'react';
import { useRouter } from 'next/router';
import { getGameDetails, getPlayers } from '../utils/game';
import { socket } from '../utils/socket';

const Lobby = () => {
	const router = useRouter();
	const [nickname, setNickname] = React.useState('');
	const [players, setPlayers] = React.useState([]);
	const { gameId } = router.query;

	const isHost = React.useMemo(
		() => players[0]?.address === window.ethereum.selectedAddress,
		[players]
	);

	const joined = React.useMemo(
		() => players.map(p => p.address).includes(window.ethereum.selectedAddress),
		[players]
	);

	React.useEffect(() => {
		(async () => {
			if (gameId) {
				const data = await getPlayers(gameId as string);
				setPlayers(data.players);
			}
		})();
	}, [gameId]);

	const handleJoinGame = async () => {
		await window.ethereum.enable();

		const { contract, stake } = await getGameDetails(gameId as string);

		window.ethereum.sendAsync(
			{
				method: 'eth_sendTransaction',
				params: [
					{
						nonce: '0x00',
						gasPrice: '30000',
						gas: '21000',
						to: contract,
						from: window.ethereum.selectedAddress,
						value: parseInt(stake).toString(16),
						chainId: 3
					}
				]
			},
			(error, result) => {
				if (error) console.error(error);
				else {
					console.log(result);
				}
			}
		);

		socket.emit('join-game', {
			nickname,
			address: window.ethereum.selectedAddress,
			gameId
		});
	};

	React.useEffect(() => {
		socket.on('game-joined', ({ player }) => {
			setPlayers([...players, player]);
		});
	}, [socket]);

	return (
		<div>
			<div>
				{joined ? (
					<>
						<div>
							<h1>Lobby</h1>
							{players.map(player => (
								<div key={player.id}>
									<p>{player.nickname}</p>
								</div>
							))}
						</div>
						{isHost ? (
							<button>Start game</button>
						) : (
							<p>Waiting for game to start...</p>
						)}
					</>
				) : (
					<form onSubmit={handleJoinGame}>
						<input
							name='nickname'
							placeholder='Your nickname'
							onChange={e => setNickname(e.target.value)}
						/>
						<button type='submit'>Join game</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default Lobby;
