import React from "react";
import { View, StyleSheet } from "react-native";
import Progress from "../components/game/Progress";
import CurrentQuestion from "../components/game/CurrentQuestion";

// Remember, we have to ensure that people get the same question for every round. Does that mean it makes sense to defer the task of fetching the question to the server? Yes.
// Here's how it works:
// - The user asks to get the next question (passing the round number).
// - We fetch the question for that round if it hasn't been previously fetched, and store it to Redis (key: <gameId>-<roundNumber>)
// - If it has, we get the cached version from Redis.
// - The questions have an expiry date of (numberOfRounds * roundDuration), which is pretty generous.
//
// But since all of this is happening in realtime, it becomes apparent that very bad things will happen if two users hit the endpoint at the exact same time. We have to cache future questions, or just even cache all the questions from the start.

const Game: React.FC = () => {
  return (
    <View style={styles.container}>
      <Progress />
      <CurrentQuestion />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Game;
