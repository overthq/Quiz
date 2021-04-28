import React from 'react';
import Progress from '../components/game/Progress';
import Question from '../components/game/Question';
import LoadingRound from '../components/game/LoadingRound';
import RoundStatus from '../components/game/RoundStatus';
import Score from '../components/game/Score';
import Leaderboard from '../components/game/Leaderboard';
import { GameContext } from '../contexts/GameContext';

const Game: React.FC = () => {
	const { state } = React.useContext(GameContext);

	if (state.leaderboard) return <Leaderboard />;
	if (state.status) return <RoundStatus />;
	if (!state.question) return <LoadingRound />;

	return (
		<div>
			<Progress />
			<Score />
			<p>Round: {state.round}</p>
			<Question question={state.question} />
		</div>
	);
};

export default Game;
