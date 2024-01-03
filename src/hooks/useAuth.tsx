import User from "../types/User";
import React, { useContext, createContext, useEffect, useMemo, useState } from "react";
import axios, { isAxiosError } from "axios";

type Props = {
    children: React.ReactNode;
};

type AuthContextReturns = {
    user: User | null;
    token: string;
    initAll: () => Promise<boolean>;
    login: (data: UserLogin) => Promise<LoginResponse>;
    logOut: () => Promise<void>;
};

type UserLogin = {
    readonly email: string;
    readonly password: string;
};

type LoginResponse = {
    readonly token: string;
    readonly refresh_token: string;
    readonly expires_in: number;
    readonly token_type: string;
    readonly resource_owner: User & {
        readonly created_at: string;
        readonly updated_at: string;
    };
};

type ErrorResponse = {
    readonly error: string;
    readonly error_description: string[];
};

const AuthContext = createContext<AuthContextReturns | null>(null);

// TODO
// Refactor to use cookie for security
const AuthProvider: React.FC<Props> = ({ children }) => {
    const userInStorage = localStorage.getItem("CUR_USER");
    const [user, setUser] = useState<User | null>(userInStorage ? JSON.parse(userInStorage) : null);
    const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN") || "");
    const [expires, setExpires] = useState(localStorage.getItem("EXPIRE_TIME") || "");

    // Initialise axios defaults
    axios.defaults.baseURL = process.env.REACT_APP_API_SERVER;
    axios.defaults.headers.post["Content-Type"] = "application/json";

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("ACCESS_TOKEN");
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            localStorage.setItem("CUR_USER", JSON.stringify(user));
        } else {
            localStorage.removeItem("CUR_USER");
        }
    }, [user]);

    // Login api call
    const login = async (data: UserLogin) => {
        try {
            const expireTime = new Date();
            const response = await axios.post("/tokens/sign_in", data);
            const userResponse: LoginResponse = response.data;
            expireTime.setSeconds(expireTime.getSeconds() + userResponse.expires_in);
            setUser({
                id: userResponse.resource_owner.id,
                username: userResponse.resource_owner.username,
                email: userResponse.resource_owner.email,
                first_name: userResponse.resource_owner.first_name,
                last_name: userResponse.resource_owner.last_name,
            });
            setToken(userResponse.token);
            setExpires(expireTime.getTime().toString());
            localStorage.setItem("ACCESS_TOKEN", userResponse.token);
            localStorage.setItem("EXPIRE_TIME", expireTime.getTime().toString());
            localStorage.setItem("REFRESH_TOKEN", userResponse.refresh_token);
            return userResponse;
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                throw e.response.data as ErrorResponse;
            } else {
                throw new Error("Bad request");
            }
        }
    };

    // Clear memory and local storage
    const clearTokens = () => {
        setUser(null);
        setToken("");
        setExpires("");
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("EXPIRE_TIME");
        localStorage.removeItem("REFRESH_TOKEN");
    };

    // Logout api call
    const logOut = async () => {
        try {
            await axios.post("/tokens/revoke");
            clearTokens();
            return;
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                throw e.response.data as ErrorResponse;
            } else {
                throw new Error("Bad request");
            }
        }
    };

    const initToken = async () => {
        if (!token) {
            // No logged in user, simply return.
            return;
        } else {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            if (new Date().getTime() < parseInt(expires)) {
                // Current token is still valid, return
                return;
            } else {
                // Begin refresh token process
                const expireTime = new Date();
                const refreshToken = localStorage.getItem("REFRESH_TOKEN");
                axios.defaults.headers.common["Authorization"] = "Bearer " + refreshToken;
                try {
                    const response = await axios.post("/tokens/refresh");
                    const userResponse: LoginResponse = response.data;
                    expireTime.setSeconds(expireTime.getSeconds() + userResponse.expires_in);
                    setToken(userResponse.token);
                    setExpires(expireTime.getTime().toString());
                    localStorage.setItem("ACCESS_TOKEN", userResponse.token);
                    localStorage.setItem("EXPIRE_TIME", expireTime.getTime().toString());
                    localStorage.setItem("REFRESH_TOKEN", userResponse.refresh_token);
                    return;
                } catch (e) {
                    if (isAxiosError(e) && e.response) {
                        clearTokens();
                        throw new Error("Error response from server");
                    } else {
                        throw new Error("Bad request");
                    }
                }
            }
        }
    };

    const initUser = async () => {
        try {
            if (token && !user) {
                const response = await axios.get("/tokens/info");
                const userResponse: LoginResponse = response.data;
                setUser({
                    id: userResponse.resource_owner.id,
                    username: userResponse.resource_owner.username,
                    email: userResponse.resource_owner.email,
                    first_name: userResponse.resource_owner.first_name,
                    last_name: userResponse.resource_owner.last_name,
                });
            }
            return;
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                clearTokens();
                throw new Error("Error response from server");
            } else {
                throw new Error("Bad request");
            }
        }
    };

    // Initialise token and user upon every page load
    const initAll = async () => {
        await initToken();
        await initUser();
        return true;
    };

    // Memoized value of the authentication context
    const contextValue = useMemo(
        () => ({
            user,
            token,
            initAll,
            login,
            logOut,
        }),
        [token, user],
    );

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
