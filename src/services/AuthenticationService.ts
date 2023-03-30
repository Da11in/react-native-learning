import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  User,
} from "firebase/auth";
import { firebaseConfig } from "../../firebase.config";
import { FirebaseErrors } from "../constants/FirebaseErrors";

type AuthParams = {
  email: string;
  password: string;
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .then((value) => {
    console.log("then block value - ", value);
  })
  .catch((err) => {
    console.log("err block value - ", err);
  });

const AuthenticationService = {
  login: async ({ email, password }: AuthParams) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      return { data: res.user, error: null };
    } catch (err) {
      return { data: null, error: FirebaseErrors[err.code] };
    }
  },

  signup: async ({ email, password }: AuthParams) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      return { data: res.user, error: null };
    } catch (err) {
      return { data: null, error: FirebaseErrors[err.code] };
    }
  },

  subscribeOnAuthState: (callback: (user: User) => void) => {
    console.log(callback);
    console.log(auth);
    auth.onAuthStateChanged(callback);
  },
};

export default AuthenticationService;
