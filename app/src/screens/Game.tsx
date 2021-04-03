import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import Progress from '../components/game/Progress';
import CurrentQuestion from '../components/game/CurrentQuestion';
import { useAppSelector } from '../redux/store';
import LoadingRound from '../components/game/LoadingRound';
import RoundStatus from '../components/game/RoundStatus';
import { setNextQuestion } from '../redux/game/actions';

const Game: React.FC = () => {
	const dispatch = useDispatch();
	const { loading, question, round, result } = useAppSelector(
		({ game }) => game
	);

	React.useEffect(() => {
		dispatch(setNextQuestion());
	}, []);

	// Somewhat interesting to explore (nost likely the correct implementation):
	// When answers are selected, defer the confirmation until time runs out,
	// but store the time left at the point of answering the question,
	// so that the RoundStatus can be shown at the same time for everyone.
	// I might also have to leave some "allowance" for people who submit their answers just before the time runs out.

	if (result) return <RoundStatus result={result} />;

	if (loading) return <LoadingRound round={round} />;

	return (
		question && (
			<View style={styles.container}>
				<Progress />
				<CurrentQuestion question={question} />
			</View>
		)
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default Game;
