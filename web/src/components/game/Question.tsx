import React from 'react';
import styled from 'styled-components';
import { unescape } from 'html-escaper';
import QuestionOption from './QuestionOption';
import { socket } from '../../utils/socket';
import { GameContext } from '../../contexts/GameContext';

const QuestionContainer = styled.div`
	max-width: 600px;
	max-height: 800px;
	height: 100%;
	width: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 16px;

	h3 {
		font-size: 26px;
		font-weight: 500;
		text-align: center;
		margin-bottom: 16px;
	}

	div {
		display: flex;
		flex-direction: column;
	}
`;

interface QuestionType {
	question: string;
	options: string[];
}

interface QuestionProps {
	question: QuestionType;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
	const [answered, setAnswered] = React.useState(false);
	const { state } = React.useContext(GameContext);

	const handleSelect = async (option: string) => {
		setAnswered(true);

		socket.emit('answer-question', {
			gameId: state.gameId,
			playerId: state.playerId,
			round: state.round,
			option,
			timeLeft: state.timeLeft
		});
	};

	return (
		<QuestionContainer>
			<h3>{unescape(question.question)}</h3>
			<div>
				{question.options.map(option => (
					<QuestionOption
						key={option}
						text={unescape(option)}
						onSelect={handleSelect}
						disabled={answered}
					/>
				))}
			</div>
		</QuestionContainer>
	);
};

export default Question;
