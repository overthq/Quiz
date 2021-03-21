import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CurrentQuestion = () => {
  // Get the current question from the game state.

  return (
    <View>
      <Text style={styles.title}>Question Title</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "500",
    fontSize: 32,
  },
});

export default CurrentQuestion;
