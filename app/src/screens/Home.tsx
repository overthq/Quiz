import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";

const Home: React.FC = () => {
  const { navigate } = useNavigation();

  const createGame = () => {
    navigate("Game");
  };

  return (
    <View style={styles.container}>
      <Text>Quiz</Text>
      <Button onPress={createGame}>Create Game</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
