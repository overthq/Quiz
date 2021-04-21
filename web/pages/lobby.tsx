import React from 'react';
import { useRouter } from 'next/router';
import { getGameDetails, getPlayers } from '../utils/game';
import { socket } from '../utils/socket';
import { GameContext } from '../contexts/GameContext';

const Lobby = () => {
	const router = useRouter();
	const [nickname, setNickname] = React.useState('');
	const [players, setPlayers] = React.useState([]);
	const { gameId } = router.query;
	const { dispatch } = React.useContext(GameContext);

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

	const handleJoinGame: React.MouseEventHandler<HTMLButtonElement> = async e => {
		e.preventDefault();
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
					socket.emit('join-game', {
						nickname,
						address: window.ethereum.selectedAddress,
						gameId
					});
				}
			}
		);
	};

	const initGame = () => {
		const playerId = players.find(
			p => p.address === window.ethereum.selectedAddress
		);

		if (playerId) {
			dispatch({ gameId: gameId as string, playerId } as any);
		} else {
			throw new Error('Impostor found');
		}
	};

	const startGame: React.MouseEventHandler<HTMLButtonElement> = async e => {
		e.preventDefault();
		socket.emit('start-game', {
			gameId,
			rounds: 10
		});

		initGame();
		router.push('/game');
	};

	React.useEffect(() => {
		socket.on('game-joined', ({ player }) => {
			setPlayers([...players, player]);
		});

		socket.on('game-started', () => {
			// Dispatch action to initialize game with the information at hand.
			initGame();
			router.push('/game');
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
								<div key={player._id}>
									<p>{player.nickname}</p>
								</div>
							))}
						</div>
						{isHost ? (
							<button onClick={startGame}>Start game</button>
						) : (
							<p>Waiting for game to start...</p>
						)}
					</>
				) : (
					<div>
						<input
							name='nickname'
							placeholder='Your nickname'
							onChange={e => setNickname(e.target.value)}
						/>
						<button onClick={handleJoinGame}>Join game</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Lobby;
