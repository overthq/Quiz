import React from 'react';
import { getGameDetails, getPlayers } from '../utils/game';
import { socket } from '../utils/socket';
import { GameContext, Player } from '../contexts/GameContext';
import { useHistory, useParams } from 'react-router';

const Lobby = () => {
	const history = useHistory();
	const [nickname, setNickname] = React.useState('');
	const [players, setPlayers] = React.useState<Player[]>([]);
	const { gameId } = useParams<{ gameId: string }>();
	const { dispatch } = React.useContext(GameContext);

	const isHost = React.useMemo(
		() => players[0]?.address === (window as any).ethereum.selectedAddress,
		[players]
	);

	const joined = React.useMemo(
		() =>
			players
				.map(p => p.address)
				.includes((window as any).ethereum.selectedAddress),
		[players]
	);

	const fetchPlayers = React.useCallback(async () => {
		const data = await getPlayers(gameId);
		setPlayers(data.players);
	}, [gameId]);

	React.useEffect(() => {
		fetchPlayers();
	}, []);

	const handleJoinGame: React.MouseEventHandler<HTMLButtonElement> = async e => {
		e.preventDefault();
		await (window as any).ethereum.enable();

		const { contract, stake } = await getGameDetails(gameId as string);

		(window as any).ethereum.sendAsync(
			{
				method: 'eth_sendTransaction',
				params: [
					{
						nonce: '0x00',
						gasPrice: '30000',
						gas: '21000',
						to: contract,
						from: (window as any).ethereum.selectedAddress,
						value: parseInt(stake).toString(16),
						chainId: 3
					}
				]
			},
			(error: any, result: any) => {
				if (error) console.error(error);
				else {
					console.log(result);
					socket.emit('join-game', {
						nickname,
						address: (window as any).ethereum.selectedAddress,
						gameId
					});
					// Maybe wait a couple of seconds?
					fetchPlayers();
				}
			}
		);
	};

	const initGame = React.useCallback(() => {
		const playerId = players.find(
			p => p.address === (window as any).ethereum.selectedAddress
		);

		if (playerId) {
			dispatch({ gameId, playerId } as any);
			history.push('/game');
		} else {
			throw new Error('Impostor found');
		}
	}, [dispatch, gameId, players, history]);

	const startGame: React.MouseEventHandler<HTMLButtonElement> = async e => {
		e.preventDefault();
		socket.emit('start-game', {
			gameId,
			rounds: 10
		});
		// initGame();
	};

	React.useEffect(() => {
		socket.on('game-joined', ({ player }) => {
			setPlayers([...players, player]);
		});

		socket.on('game-started', () => {
			initGame();
		});
	}, [history, initGame, players]);

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
