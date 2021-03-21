import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Connect: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to Quiz!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Connect;
