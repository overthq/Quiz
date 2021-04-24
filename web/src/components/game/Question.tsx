import React from 'react';
import QuestionOption from './QuestionOption';
import { socket } from '../../utils/socket';
import { GameContext } from '../../contexts/GameContext';

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
		<div>
			<h3>{question.question}</h3>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{question.options.map(option => (
					<QuestionOption
						key={option}
						text={option}
						onSelect={handleSelect}
						disabled={answered}
					/>
				))}
			</div>
		</div>
	);
};

export default Question;
