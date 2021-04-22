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
		socket.emit('answer-question', {
			gameId: state.gameId,
			playerId: state.playerId,
			round: state.round,
			option,
			timeLeft: state.timeLeft
		});
		setAnswered(true);
	};

	return (
		<div>
			<h3>{question.question}</h3>
			{question.options.map(option => (
				<QuestionOption
					key={option}
					text={option}
					onSelect={handleSelect}
					disabled={answered}
				/>
			))}
		</div>
	);
};

export default Question;
