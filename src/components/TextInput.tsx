import { useState } from "react";
import { StyleSheet, Text, View, TextInput as RNTextInput, ViewStyle } from "react-native";
import { colors } from "../styles/colors";

type TextInputProps = {
  value: string;
  onChange: (arg: string) => void;
  type?: "text" | "email" | "password";
  placeholder?: string;
  label?: string;
  error?: string;
  containerStyles?: ViewStyle;
};

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  type = "text",
  placeholder,
  label,
  error,
  containerStyles,
}): React.ReactElement => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <View style={[styles.container, containerStyles]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <RNTextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={type === "email" ? "email-address" : "default"}
        secureTextEntry={secureTextEntry && type === "password"}
        style={styles.input}
        selectionColor={colors.text}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    position: "relative",
  },
  input: {
    color: colors.text,
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderBottomColor: colors.border,
    fontSize: 18,
  },
  password: {},
  label: {
    color: colors.secondary,
    textTransform: "uppercase",
  },
  error: {
    position: "absolute",
    bottom: -20,
    color: colors.error,
  },
});
