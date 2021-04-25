import React from 'react';
import styled from 'styled-components';

interface QuestionOptionProps {
	text: string;
	onSelect(option: string): void;
	disabled: boolean;
}

const QuestionOptionWrapper = styled.button`
	width: 300px;
	height: 40px;
	border-radius: 20px;
	border: 2px solid #505050;

	font-size: 16px;
	font-weight: 500;
	text-align: center;
	background-color: #ffffff;

	&:hover {
		background-color: #d6d6d6;
	}

	&:not(:last-child) {
		margin-bottom: 16px;
	}
`;

const QuestionOption: React.FC<QuestionOptionProps> = ({
	text,
	onSelect,
	disabled
}) => {
	const handlePress = () => onSelect(text);

	return (
		<QuestionOptionWrapper onClick={handlePress} disabled={disabled}>
			{text}
		</QuestionOptionWrapper>
	);
};

export default QuestionOption;
