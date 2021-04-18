import React from 'react';
import { useRouter } from 'next/router';
import { getPlayers } from '../utils/game';
import { socket } from '../utils/socket';

const Lobby = () => {
	const router = useRouter();
	const [nickname, setNickname] = React.useState('');
	const [players, setPlayers] = React.useState([]);
	const { gameId } = router.query;

	const joined = React.useMemo(
		() => players.map(p => p.address).includes(window.ethereum.selectedAddress),
		[]
	);

	React.useEffect(() => {
		(async () => {
			if (gameId) {
				const data = await getPlayers(gameId as string);
				setPlayers(data.players);
			} else {
				router.push('/');
			}
		})();
	}, []);

	const handleJoinGame = async () => {
		await window.ethereum.enable();

		socket.emit('join-game', {
			nickname,
			address: window.ethereum.selectedAddress,
			gameId
		});
	};

	React.useEffect(() => {
		socket.on('game-joined', ({ players }) => {
			setPlayers(players);
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
						<p>Waiting for game to start...</p>
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
