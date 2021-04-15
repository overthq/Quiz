import React from 'react';
import { useDispatch } from 'react-redux';
import Progress from '../components/game/Progress';
import Question from '../components/game/Question';
import LoadingRound from '../components/game/LoadingRound';
import RoundStatus from '../components/game/RoundStatus';
import Score from '../components/game/Score';
import Leaderboard from '../components/game/Leaderboard';
import { useAppSelector } from '../redux/store';
import { setNextQuestion, answerQuestion } from '../redux/game/actions';

const Game: React.FC = () => {
	const dispatch = useDispatch();
	const { loading, question, round, result, complete } = useAppSelector(
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
	}, []);

	if (complete) return <Leaderboard />;

	if (result) return <RoundStatus result={result} />;

	if (loading) return <LoadingRound round={round} />;

	return (
		question && (
			<div>
				<Progress ended={!!option} />
				<Score />
				<Question
					question={question}
					setOption={setOption}
					answered={!!option}
				/>
			</div>
		)
	);
};

export default Game;
