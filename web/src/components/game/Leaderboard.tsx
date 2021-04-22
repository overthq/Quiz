import React from 'react';
import { GameContext } from '../../contexts/GameContext';

const Leaderboard: React.FC = () => {
	const { state } = React.useContext(GameContext);

	return (
		<div>
			<p>Leaderboard</p>
			{state.leaderboard?.map(player => (
				<div key={player._id}>
					<p>{player.nickname}</p>
					<p>{player.score}</p>
				</div>
			))}
		</div>
	);
};

export default Leaderboard;
