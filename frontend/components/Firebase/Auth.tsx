import React, { useContext, useState, useEffect, useRef } from "react";
import { auth } from "./Firebase";
import {
  GoogleAuthProvider, User, signInWithPopup
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

const AuthContext = React.createContext<any>({});
const provider_google = new GoogleAuthProvider();

const signInWithGoogle = () => signInWithPopup(auth, provider_google);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children } : any) {
  const [currentUser, setCurrentUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  function login() {
    return signInWithGoogle();
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log(user)
      setLoading(true);
      user ? setCurrentUser(user) : null;
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    loading,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <></> : children}
    </AuthContext.Provider>
  );
}
