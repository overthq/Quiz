import React from 'react';

interface Player {
	id: string;
	nickname: string;
	address: string;
	score: number;
}

interface LeaderboardProps {
	data: Player[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
	return (
		<div>
			<p>Leaderboard</p>
			{data.map(player => (
				<div key={player.id}>
					<p>{player.nickname}</p>
					<p>{player.score}</p>
				</div>
			))}
		</div>
	);
};

export default Leaderboard;
