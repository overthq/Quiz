import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QuestionOption from './QuestionOption';
import { Question } from '../../redux/game/types';

interface CurrentQuestionProps {
	question: Question;
	setOption(option: string): void;
	answered: boolean;
}

const CurrentQuestion: React.FC<CurrentQuestionProps> = ({
	question,
	setOption,
	answered
}) => {
	return (
		<View>
			<Text style={styles.title}>{question.question}</Text>
			{question.options.map(option => (
				<QuestionOption
					key={option}
					text={option}
					onSelect={setOption}
					disabled={answered}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		fontWeight: '500',
		fontSize: 24,
		textAlign: 'center'
	}
});

export default CurrentQuestion;
