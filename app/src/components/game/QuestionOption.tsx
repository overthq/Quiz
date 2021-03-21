import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

interface QuestionOptionProps {
  text: string;
  isCorrect: boolean;
  onSelect(): void;
}

const QuestionOption: React.FC<QuestionOptionProps> = ({
  text,
  isCorrect,
  onSelect,
}) => {
  const handlePress = () => {
    onSelect();
    if (isCorrect) {
    }
    // Change the presentation style of the thing, wait a second and then animate away from said screen
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <Text>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default QuestionOption;
