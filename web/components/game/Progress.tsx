import React from 'react';

interface ProgressProps {
	ended: boolean;
}

const Progress: React.FC<ProgressProps> = ({ ended }) => {
	const [timeLeft, setTimeLeft] = React.useState(10);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			if (timeLeft > 0 && !ended) {
				setTimeLeft(timeLeft - 1);
			}
		}, 1000);

		return () => {
			clearTimeout(timeout);
		};
	});

	return (
		<div>
			<p>Time left: {timeLeft}</p>
		</div>
	);
};

export default Progress;
