import React from 'react';
import { GameContext } from '../../contexts/GameContext';

const Progress: React.FC = () => {
	const { state } = React.useContext(GameContext);

	return (
		<div>
			<p>Time left: {state.timeLeft}</p>
		</div>
	);
};

export default Progress;
