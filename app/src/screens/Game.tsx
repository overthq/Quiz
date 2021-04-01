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
