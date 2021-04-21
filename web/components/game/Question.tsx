import React from 'react';
import QuestionOption from './QuestionOption';
import { Question as QuestionType } from '../../redux/game/types';

interface QuestionProps {
	question: QuestionType;
	setOption(option: string): void;
	answered: boolean;
}

const Question: React.FC<QuestionProps> = ({
	question,
	setOption,
	answered
}) => {
	return (
		<div>
			<h3>{question.question}</h3>
			{question.options.map(option => (
				<QuestionOption
					key={option}
					text={option}
					onSelect={setOption}
					disabled={answered}
				/>
			))}
		</div>
	);
};

export default Question;
