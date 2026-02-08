import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL;

  const syncUserWithDB = useCallback(async (firebaseUser, extraData = {}) => {
    if (!firebaseUser) return null;

    try {
      const idToken = await firebaseUser.getIdToken();

      const { data } = await axios.post(
        `${API}/users/sync`,
        {
          name: extraData.name || firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: extraData.photoURL || firebaseUser.photoURL,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        },
      );

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      setDbUser(data?.user || null);
      return data?.user;
    } catch (err) {
      console.error("User sync failed:", err.response?.data || err.message);
      return null;
    }
  }, [API]);

  const registerUser = async (email, password, name, photoURL) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL,
      });
      await syncUserWithDB(result.user, { name, photoURL });
      return result;
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await syncUserWithDB(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncUserWithDB(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      localStorage.removeItem("token");
      await signOut(auth);
      setDbUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        await syncUserWithDB(currentUser);
      } else {
        setDbUser(null);
        localStorage.removeItem("token");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    dbUser,
    role: dbUser?.role || "user",
    isPremium: dbUser?.isPremium || false,
    loading,
    registerUser,
    loginUser,
    googleLogin,
    logoutUser,
    refreshUserStatus: useCallback(() => syncUserWithDB(user), [syncUserWithDB, user]),
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
