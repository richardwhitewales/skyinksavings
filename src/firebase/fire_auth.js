import { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from "@/firebase/fire_config";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";

const formatAuthUser = (user) => ({ uid: user.uid, email: user.email });

export default function useFireAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState) => {
    if (!authState) {
      setLoading(false)
      return;
    }

    setLoading(true)

    var formattedUser = formatAuthUser(authState);

    setAuthUser(formattedUser);

    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signIn = async (email, password) => await signInWithEmailAndPassword(auth, email, password);

  const signUp = async (email, password) => await createUserWithEmailAndPassword(auth, email, password);

  const logOut = async () => {
    try {
      window.location.href = "/";
      await signOut(auth).then(clear);
      Cookies.remove("SkyinkSignedIn");
      toast.success("User logged out.");
    } catch (error) {
      toast.error(`Error loggouting out: ${error}`);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return { authUser, loading, signIn, signUp, logOut };
}