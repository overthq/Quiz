import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QuestionOption from './QuestionOption';
import { Question } from '../../redux/game/types';

interface CurrentQuestionProps {
	question: Question;
	setOption(option: string): void;
}

const CurrentQuestion: React.FC<CurrentQuestionProps> = ({
	question,
	setOption
}) => {
	return (
		<View>
			<Text style={styles.title}>{question.question}</Text>
			{question.options.map(option => (
				<QuestionOption text={option} onSelect={setOption} />
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
