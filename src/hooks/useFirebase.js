import { useEffect, useState } from "react";
import initializeAuthentication from "../Firebase/Firebase.init";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";

initializeAuthentication();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState();

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const createAccountWithEmailPassword = (auth, email, password) => {
        setIsLoading(false);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginWithEmailPassword = (auth, email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInUsingGoogle = () => {
        setIsLoading(true);
        return signInWithPopup(auth, googleProvider);
    };
    const logOut = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => {
                setUser({});
            })
            .finally(() => setIsLoading(false));
    };
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
            setIsLoading(false);
        });
    }, []);
    useEffect(() => {
        fetch(`https://rocky-dawn-74128.herokuapp.com/users/${user.email}`)
            .then((res) => res.json())
            .then((data) => setAdmin(data.admin));
    }, [user.email]);

    return {
        user,
        error,
        signInUsingGoogle,
        logOut,
        setUser,
        createAccountWithEmailPassword,
        loginWithEmailPassword,
        auth,
        setIsLoading,
        isLoading,
        updateProfile,
        setError,
        admin,
    };
};
export default useFirebase;
