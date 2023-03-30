import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Login, Signup } from "../../screens";
import { colors } from "../../styles/colors";

export type AuthStackParams = {
  Login: undefined;
  Signup: undefined;
};

export type MainStackParams = {
  Home: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParams>();

const MainStack = createNativeStackNavigator<MainStackParams>();

export const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerTransparent: true,
      headerTitle: "",
      animation: "slide_from_right",
      headerTintColor: colors.text,
    }}
  >
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Signup" component={Signup} />
  </AuthStack.Navigator>
);

export const MainNavigator = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Home" component={Home} />
  </MainStack.Navigator>
);
