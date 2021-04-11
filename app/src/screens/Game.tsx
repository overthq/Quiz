import React from 'react';
import { View, StyleSheet, AppState } from 'react-native';
import { useDispatch } from 'react-redux';
import Progress from '../components/game/Progress';
import CurrentQuestion from '../components/game/CurrentQuestion';
import { useAppSelector } from '../redux/store';
import LoadingRound from '../components/game/LoadingRound';
import RoundStatus from '../components/game/RoundStatus';
import Score from '../components/game/Score';
import {
	setNextQuestion,
	answerQuestion,
	completeGame
} from '../redux/game/actions';

const Game: React.FC = () => {
	const dispatch = useDispatch();
	const { loading, question, round, result } = useAppSelector(
		({ game }) => game
	);
	const [timeLeft, setTimeLeft] = React.useState(10);
	const [option, setOption] = React.useState('');

	React.useEffect(() => {
		if (timeLeft === 0) {
			dispatch(answerQuestion(option));
		}
	}, [timeLeft]);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			if (timeLeft > 0) {
				setTimeLeft(timeLeft - 1);
			}
		}, 1000);

		return () => {
			clearTimeout(timeout);
		};
	});

	React.useEffect(() => {
		dispatch(setNextQuestion());
		AppState.addEventListener('change', nextAppState => {
			if (nextAppState === 'background') {
				dispatch(completeGame());
			}
		});
	}, []);

	// If complete, show the live leaderboard, with animations.

	if (result) return <RoundStatus result={result} />;

	if (loading) return <LoadingRound round={round} />;

	return (
		question && (
			<View style={styles.container}>
				<Progress ended={!!option} />
				<Score />
				<CurrentQuestion
					question={question}
					setOption={setOption}
					answered={!!option}
				/>
			</View>
		)
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 8
	}
});

export default Game;
