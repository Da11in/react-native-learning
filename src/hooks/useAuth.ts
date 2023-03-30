import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { AuthenticationService } from "../services";

const isValidUserResponse = (arg: any): arg is User => (arg as User).uid !== undefined;

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>(null);

  const handleFirebaseAuthResponse = (res: { data: User | null; error: any }): string => {
    if (isValidUserResponse(res.data)) {
      setUser(res.data);
      return "";
    }

    if (res.error) {
      return res.error;
    }

    return "";
  };

  const login = async (email: string, password: string) => {
    const res = await AuthenticationService.login({ email, password });
    return handleFirebaseAuthResponse(res);
  };

  const createUser = async (email: string, password: string) => {
    const res = await AuthenticationService.signup({ email, password });
    return handleFirebaseAuthResponse(res);
  };

  const onAuthStateChangedCallback = (user: User) => {
    setUser(user);
  };

  useEffect(() => {
    console.log("use effect");
    const subscription = AuthenticationService.subscribeOnAuthState(onAuthStateChangedCallback);
    return subscription;
  }, []);

  return { user, loading, login, createUser };
};
