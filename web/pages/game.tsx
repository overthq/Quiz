import React from 'react';
import { useDispatch } from 'react-redux';
import Progress from '../components/game/Progress';
import Question from '../components/game/Question';
import LoadingRound from '../components/game/LoadingRound';
import RoundStatus from '../components/game/RoundStatus';
import Score from '../components/game/Score';
import Leaderboard from '../components/game/Leaderboard';
import { useAppSelector } from '../redux/store';
import { setNextQuestion, questionAnswered } from '../redux/game/actions';
import { socket } from '../utils/socket';
import TimeUp from '../components/game/TimeUp';

const Game: React.FC = () => {
	const dispatch = useDispatch();
	const { loading, question, round, result } = useAppSelector(
		({ game }) => game
	);
	const [timeLeft, setTimeLeft] = React.useState(10);
	const [option, setOption] = React.useState('');
	const [leaderboard, setLeaderboard] = React.useState([]);

	React.useEffect(() => {
		socket.on('question', question => {
			setTimeLeft(10);
			dispatch(setNextQuestion(question));
		});

		socket.on('question-answered', payload => {
			dispatch(questionAnswered(payload));
		});

		socket.on('leaderboard', payload => {
			setLeaderboard(payload);
		});
	}, [socket]);

	React.useEffect(() => {
		const interval = setInterval(() => {
			if (timeLeft > 0) {
				setTimeLeft(timeLeft - 1);
			} else {
				clearInterval(interval);
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	if (leaderboard.length > 0) return <Leaderboard data={leaderboard} />;

	if (timeLeft === 0) return <TimeUp />;

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
