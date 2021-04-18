import React from 'react';
import { GameResult } from '../../redux/game/types';
import { useAppSelector } from '../../redux/store';

interface RoundStatusProps {
	result: GameResult;
}

const RoundStatus: React.FC<RoundStatusProps> = ({ result }) => {
	const { isCorrect, correctAnswer } = result;
	const score = useAppSelector(({ game }) => game.score);

	return (
		<div>
			<p>{isCorrect ? 'Correct!' : 'Wrong!'}</p>
			{!isCorrect && (
				<>
					<p>The correct answer was:</p>
					<p>{correctAnswer}</p>
				</>
			)}
			<p>Score:</p>
			<p>{score}</p>
			<p>Waiting for next round...</p>
		</div>
	);
};

export default RoundStatus;
