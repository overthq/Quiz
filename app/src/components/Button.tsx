import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ButtonProps {
  onPress(): void;
}

const Button: React.FC<ButtonProps> = ({ children, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Text style={styles.text}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    borderRadius: 6,
    backgroundColor: "#000000",
  },
  text: {
    fontSize: 17,
    fontWeight: "500",
    backgroundColor: "#FFFFFF",
  },
});

export default Button;
