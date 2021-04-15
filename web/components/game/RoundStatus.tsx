import React from 'react';
import { useDispatch } from 'react-redux';
import { setNextQuestion } from '../../redux/game/actions';
import { GameResult } from '../../redux/game/types';
import { useAppSelector } from '../../redux/store';

interface RoundStatusProps {
	result: GameResult;
}

const RoundStatus: React.FC<RoundStatusProps> = ({ result }) => {
	const { isCorrect, correctAnswer } = result;
	const score = useAppSelector(({ game }) => game.score);
	const dispatch = useDispatch();

	React.useEffect(() => {
		setTimeout(() => {
			dispatch(setNextQuestion());
		}, 3000);
	}, []);

	// style={[
	// 	styles.container,
	// 	{ backgroundColor: isCorrect ? 'green' : 'red' }
	// ]}

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
		</div>
	);
};

export default RoundStatus;
