import React from 'react';
import styled from 'styled-components';
import { GameContext } from '../../contexts/GameContext';

const LeaderboardContainer = styled.div`
	max-width: 600px;
	max-height: 800px;
	height: 100%;
	width: 100%;

	h2 {
		font-size: 32px;
		font-weight: 500;
		margin-bottom: 16px;
	}

	div {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
`;

const Leaderboard: React.FC = () => {
	const { state } = React.useContext(GameContext);

	return (
		<LeaderboardContainer>
			<h2>Leaderboard</h2>
			{state.leaderboard?.map(player => (
				<div key={player._id}>
					<p>{player.nickname}</p>
					<p>{player.score}</p>
				</div>
			))}
		</LeaderboardContainer>
	);
};

export default Leaderboard;
