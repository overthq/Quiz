import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: isCorrect ? 'green' : 'red' }
			]}
		>
			<Text>{isCorrect ? 'Correct!' : 'Wrong!'}</Text>
			{!isCorrect && (
				<>
					<Text>The correct answer was:</Text>
					<Text>{correctAnswer}</Text>
				</>
			)}
			<Text>Score:</Text>
			<Text>{score}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default RoundStatus;
