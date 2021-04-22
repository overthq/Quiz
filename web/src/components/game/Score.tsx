import React from 'react';
import { GameContext } from '../../contexts/GameContext';

const Score = () => {
	const { state } = React.useContext(GameContext);

	return (
		<div>
			<p>Score: {state.score}</p>
		</div>
	);
};

export default Score;
