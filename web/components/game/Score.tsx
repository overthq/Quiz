import React from 'react';
import { usePlayerScoreSubscription } from '../../types/api';

const Score = () => {
	const [data] = usePlayerScoreSubscription();

	return (
		<div>
			<p>Score: {data.score}</p>
		</div>
	);
};

export default Score;
