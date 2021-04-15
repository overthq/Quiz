import React from 'react';

interface LoadingRoundProps {
	round: number;
}

const LoadingRound: React.FC<LoadingRoundProps> = ({ round }) => {
	return (
		<div>
			<p>Loading round: {round}</p>
		</div>
	);
};

export default LoadingRound;
