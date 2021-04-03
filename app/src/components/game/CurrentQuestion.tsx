import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import QuestionOption from './QuestionOption';
import { Question } from '../../redux/game/types';
import { answerQuestion } from '../../redux/game/actions';

interface CurrentQuestionProps {
	question: Question;
}

const CurrentQuestion: React.FC<CurrentQuestionProps> = ({ question }) => {
	const dispatch = useDispatch();
	const handleSelect = (option: string) => {
		dispatch(answerQuestion(option));
	};

	return (
		<View>
			<Text style={styles.title}>{question.question}</Text>
			{question.options.map(option => (
				<QuestionOption text={option} onSelect={handleSelect} />
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
