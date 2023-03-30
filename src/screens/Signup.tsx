import { useFormik } from "formik";
import { useCallback, useState } from "react";
import * as yup from "yup";
import { StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { colors } from "../styles/colors";
import { Button, TextInput } from "../components";
import { useAuthContext } from "../contexts/AuthContext";

const Signup = () => {
  const { createUser } = useAuthContext();

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { firstname: "", lastname: "", email: "", password: "" },
    validationSchema: yup.object({
      firstname: yup.string().required("Required"),
      lastname: yup.string().required("Required"),
      email: yup.string().required("Required").email("Must be a valid email"),
      password: yup.string().required("Required"),
    }),
    onSubmit: async (values, helpers) => {
      setLoading(true);

      const { email, password } = values;
      const error = await createUser(email, password);

      if (error.length > 0) {
        helpers.setFieldError("email", error);
      }

      setLoading(false);
    },
  });

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
        <Text style={styles.titleText}>Create account</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputs}>
          <TextInput
            value={formik.values.firstname}
            onChange={handleChange("firstname")}
            label="First name"
            containerStyles={styles.formInput}
            error={formik.touched.firstname && formik.errors.firstname}
          />
          <TextInput
            value={formik.values.lastname}
            onChange={handleChange("lastname")}
            label="Last name"
            containerStyles={styles.formInput}
            error={formik.touched.lastname && formik.errors.lastname}
          />
          <TextInput
            value={formik.values.email}
            onChange={handleChange("email")}
            label="Email"
            containerStyles={styles.formInput}
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

        <Button text="Sign up" onPress={formik.handleSubmit} loading={loading} />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;

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
  formInput: {
    marginBottom: 40,
  },
});
