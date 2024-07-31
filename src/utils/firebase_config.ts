import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/web-extension";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "...",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
