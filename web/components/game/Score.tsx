import React from 'react';
import { useAppSelector } from '../../redux/store';

const Score = () => {
	const score = useAppSelector(({ game }) => game.score);

	return (
		<div>
			<p>Score: {score}</p>
		</div>
	);
};

export default Score;
