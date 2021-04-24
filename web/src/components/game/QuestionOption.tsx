import React from 'react';

interface QuestionOptionProps {
	text: string;
	onSelect(option: string): void;
	disabled: boolean;
}

const QuestionOption: React.FC<QuestionOptionProps> = ({ text, onSelect }) => {
	const [selected, setSelected] = React.useState(false);

	const handlePress = () => {
		onSelect(text);
		setSelected(true);
	};

	return (
		<button onClick={handlePress} disabled={selected}>
			{text}
		</button>
	);
};

// style={[styles.container, selected ? styles.selected : {}]}
export default QuestionOption;
