import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../styles/colors";

type ButtonProps = {
  onPress: () => void;
  text: string;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ onPress, text, loading }): React.ReactElement => {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.9}
      disabled={loading}
      onPress={onPress}
    >
      <View style={styles.buttonContent}>
        {loading && <ActivityIndicator color={colors.text} style={styles.loader} />}
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    padding: 20,
    marginVertical: 5,
    justifyContent: "center",
    borderRadius: 8,
    shadowColor: "#98c5ed",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  buttonContent: {
    position: "relative",
  },
  text: {
    color: colors.text,
    textTransform: "uppercase",
    fontWeight: "600",
    fontSize: 16,
  },
  loader: {
    position: "absolute",
    left: -30,
    top: -1,
  },
});
