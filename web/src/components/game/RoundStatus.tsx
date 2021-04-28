import React from 'react';
import styled from 'styled-components';
import { GameContext } from '../../contexts/GameContext';

const RoundStatusContainer = styled.div`
	max-width: 600px;
	max-height: 800px;
	height: 100%;
	width: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 16px;

	.score {
		font-size: 28px;
		font-weight: 500;
	}

	p {
		fontsize: 18px;
		fontweight: 500;
	}
`;

const headers = {
	correct: 'Correct!',
	wrong: 'Incorrect!',
	'time-up': 'Time Up!'
};

const styles = {
	correct: { backgroundColor: '#AEDFB0', color: '#587559' },
	wrong: { backgroundColor: '#DFB4AE', color: '#755958' },
	'time-up': { backgroundColor: '#DEDFAE', color: '#757258' }
};

const RoundStatus: React.FC = () => {
	const { state } = React.useContext(GameContext);

	if (!state.status) throw new Error('Should not be!');

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				...styles[state.status.kind]
			}}
		>
			<RoundStatusContainer style={styles[state.status.kind]}>
				<h3>{headers[state.status.kind]}</h3>
				{state.status.kind === 'wrong' && (
					<>
						<p>Correct answer: </p>
						<p>{state.status.correctAnswer}</p>
					</>
				)}
				<p className='score'>Score: {state.score}</p>
				<p className='waiting'>Waiting for next round...</p>
			</RoundStatusContainer>
		</div>
	);
};

export default RoundStatus;
