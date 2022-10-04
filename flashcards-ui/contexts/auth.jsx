import { createContext, useState, useContext, useEffect } from "react";
import apiClient from "../services/apiClient";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [initialized, setInitialized] = useState();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [update, setUpdate] = useState(false);
    const [form, setForm] = useState({
        username: "",
        firstName: "",
        lastName: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // should make a request to the `/auth/me` route to get the user's info
    useEffect(() => {
        if (localStorage.getItem(apiClient.tokenName)) {
            const fetchUser = async () => {
                apiClient.setToken(localStorage.getItem(apiClient.tokenName));
                const data = await apiClient.fetchUserFromToken();
                setUser(data.data.user);
            };
            fetchUser();
        }
        setIsLoggedIn(Boolean(user?.email));
        setIsLoading(false);
    }, []);

    //
    useEffect(() => {
        setIsLoggedIn(Boolean(user?.email));
    }, [user]);

    // should make a request to log the user in
    async function loginUser(credentials) {
        setIsProcessing(true);
        setError((e) => ({ ...e, form: null }));

        const { data, error } = await apiClient.loginUser({
            username: credentials.username,
            password: credentials.password,
        });
        if (error) {
            setError((e) => ({ ...e, credentials: error }));
            const message = error?.response?.data?.error?.message;
            setError((e) => ({
                ...e,
                credentials: message ? String(message) : String(error),
            }));
            setIsProcessing(false);
            return false;
        }
        if (data?.user) {
            setUser(data.user);
            apiClient.setToken(data.token);
            setIsProcessing(false);
            return true;
        }
    }

    // should make a request to sign the user up
    async function signupUser(credentials) {
        setIsProcessing(true);
        setError((e) => ({ ...e, credentials: null }));

        if (credentials.passwordConfirm !== credentials.password) {
            setError((e) => ({
                ...e,
                passwordConfirm: "Passwords do not match.",
            }));
            setIsProcessing(false);
            return;
        } else {
            setError((e) => ({ ...e, passwordConfirm: null }));
        }
        const { data, error } = await apiClient.signupUser({
            email: credentials.email,
            password: credentials.password,
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            username: credentials.username,
        });
        if (error) {
            setError((e) => ({ ...e, credentials: error }));
            const message = error?.response?.data?.error?.message;
            setError((e) => ({
                ...e,
                credentials: message ? String(message) : String(error),
            }));
            setIsProcessing(false);
            return false;
        }
        if (data?.user) {
            setUser(data.user);
            apiClient.setToken(data.token);
            setIsProcessing(false);
            return true;
        }
        setIsProcessing(false);
    }

    // function should remove the `lifetracker_token` from local storage
    // and refresh the page so that all user data is reset
    async function logoutUser() {
        await apiClient.logoutUser();
        setUser({});
        setError(null);
        setIsLoggedIn(false);
    }

    // should handle updating user's info
    async function updateUserInfo(credentials) {
        setIsProcessing(true);
        setError((e) => ({ ...e, form: null }));

        const { data, error } = await apiClient.updateProfile({
            username: credentials.username,
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            oldPassword: credentials.oldPassword,
            newPassword: credentials.newPassword,
            confirmPassword: credentials.confirmPassword,
        });
        setUser(data.user);
        if (error) {
            setError((e) => ({ ...e, credentials: error }));
            const message = error?.response?.data?.error?.message;
            setError((e) => ({
                ...e,
                credentials: message ? String(message) : String(error),
            }));
            setIsProcessing(false);
            return false;
        }
        return true;
    }

    const authValue = {
        user,
        setUser,
        initialized,
        setInitialized,
        isProcessing,
        setIsProcessing,
        error,
        setError,
        loginUser,
        signupUser,
        logoutUser,
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        update,
        setUpdate,
        updateUserInfo,
        form,
        setForm,
    };

    return (
        <AuthContext.Provider value={authValue}>
            <>{children}</>
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
