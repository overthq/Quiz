import React from 'react';
import { GameContext } from '../../contexts/GameContext';

const headers = { correct: 'Correct!', wrong: 'Wrong!', 'time-up': 'Time Up!' };

const RoundStatus: React.FC = () => {
	const { state } = React.useContext(GameContext);

	if (!state.status) throw new Error('Should not be!');

	return (
		<div>
			<h3>{headers[state.status.kind]}</h3>
			{state.status.kind === 'wrong' && (
				<>
					<p>The correct answer was:</p>
					<p>{state.status.correctAnswer}</p>
				</>
			)}
			<p>Score: {state.score}</p>
			<p>Waiting for next round...</p>
		</div>
	);
};

export default RoundStatus;
