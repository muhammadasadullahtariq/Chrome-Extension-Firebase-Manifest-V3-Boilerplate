import { useEffect, useState } from "react";
import { auth } from "./firebase_config";
import { UserInfo } from "firebase/auth/cordova";

const useFirebaseAuthentication = () => {
  const [authUser, setAuthUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const listen = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setAuthUser(authUser);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  return authUser;
};

export default useFirebaseAuthentication;
