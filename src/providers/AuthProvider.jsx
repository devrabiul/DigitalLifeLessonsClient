import { createContext, useEffect, useState, useCallback } from "react";
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile 
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";
import api from "../services/api";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [dbUser, setDbUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user data from MongoDB
    const fetchDbUser = useCallback(async (uid) => {
        if (!uid) {
            setDbUser(null);
            return;
        }
        try {
            const response = await api.get(`/users/${uid}`);
            setDbUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setDbUser(null);
        }
    }, []);

    // Refresh user data (call this after payment success)
    const refreshUser = useCallback(async () => {
        if (user?.uid) {
            await fetchDbUser(user.uid);
        }
    }, [user, fetchDbUser]);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logOut = () => {
        setLoading(true);
        setDbUser(null);
        return signOut(auth);
    };

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
            setUser(currentUser);
            if (currentUser) {
                const token = await currentUser.getIdToken();
                localStorage.setItem('access-token', token);
                // Fetch user data from MongoDB
                await fetchDbUser(currentUser.uid);
            } else {
                localStorage.removeItem('access-token');
                setDbUser(null);
            }
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        }
    }, [fetchDbUser]);

    const authInfo = {
        user,
        dbUser,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile,
        refreshUser
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
