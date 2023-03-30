import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { AuthNavigator, MainNavigator } from "./src/app/routes";
import "./firebase.config";
import { useAuth } from "./src/hooks/useAuth";
import { AuthContext } from "./src/contexts/AuthContext";
import { useMemo } from "react";

export default function App() {
  // const auth = useAuth();

  // const authCtxValue = useMemo(() => auth, [auth.user, auth.loading]);

  return (
    // <AuthContext.Provider value={authCtxValue}>
    <NavigationContainer>
      <StatusBar style="light" />
      {/* {auth.user === null ? <AuthNavigator /> : <MainNavigator />} */}
      <MainNavigator />
    </NavigationContainer>
    // </AuthContext.Provider>
  );
}
