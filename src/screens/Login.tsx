import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCallback, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as yup from "yup";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParams } from "../app/routes";

import { Button, TextInput } from "../components";
import { colors } from "../styles/colors";
import { useAuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const { login } = useAuthContext();

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().required("Required").email("Must be a valid email"),
      password: yup.string().required("Required"),
    }),
    onSubmit: async (values, helpers) => {
      setLoading(true);

      const { email, password } = values;
      const error = await login(email, password);

      if (error.length > 0) {
        helpers.setFieldError("email", error);
      }

      setLoading(false);
    },
  });

  const navToSignup = () => navigate("Signup");

  const handleChange = useCallback(
    (id: string) => (value: string) => formik.handleChange({ target: { id, value } }),
    []
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      style={{ backgroundColor: colors.background }}
    >
      <View style={styles.title}>
        <Text style={styles.titleText}>Hello.</Text>
        <Text style={styles.titleText}>Welcome Back</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputs}>
          <TextInput
            value={formik.values.email}
            onChange={handleChange("email")}
            label="Email"
            containerStyles={styles.emailInput}
            error={formik.touched.email && formik.errors.email}
            type="email"
          />
          <TextInput
            value={formik.values.password}
            onChange={handleChange("password")}
            label="Password"
            error={formik.touched.password && formik.errors.password}
            type="password"
          />
        </View>

        <Button text="Login" onPress={formik.handleSubmit} loading={loading} />
      </View>

      <Pressable onPress={navToSignup} style={styles.signupLink}>
        <Text style={styles.signupLinkText}>Do not have an account?</Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    padding: 30,
  },
  title: { width: "100%", marginBottom: 20 },
  titleText: {
    fontSize: 36,
    color: colors.text,
    fontWeight: "600",
  },
  form: {
    width: "100%",
  },
  inputs: {
    paddingVertical: 40,
  },
  emailInput: {
    marginBottom: 40,
  },
  signupLink: {
    marginTop: 40,
  },
  signupLinkText: {
    color: colors.secondary,
    fontSize: 16,
  },
});
