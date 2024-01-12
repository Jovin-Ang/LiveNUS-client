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
    signUp: (data: UserSignUp) => Promise<LoginResponse>;
    logOut: () => Promise<void>;
};

type UserLogin = {
    readonly email: string;
    readonly password: string;
};

type UserSignUp = {
    readonly first_name: string;
    readonly last_name: string;
    readonly username: string;
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

/**
 * A provider to wrap the app to provide global authentication objects to any child components.
 *
 * @param {React.ReactNode} children - The child react element
 * @returns {React.FunctionComponent} The AuthLayout component
 */
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

    /**
     * Makes a login request to the api. If successful, sets the user to the global
     * authentication context.
     *
     * @param {UserLogin} data - An object containing email and password
     * @returns {Promise<LoginResponse>} The login response promise
     * @throws {ErrorResponse} If email or password is incorrect
     * @throws {Error} If api request fails
     */
    const login = async (data: UserLogin): Promise<LoginResponse> => {
        try {
            const expireTime = new Date();
            const response = await axios.post("/tokens/sign_in", data);
            const userResponse: LoginResponse = response.data;
            expireTime.setSeconds(expireTime.getSeconds() + userResponse.expires_in);
            setUser({
                type: "user",
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

    /**
     * Makes a signup request to the api. If successful, sets the user to the global
     * authentication context.
     *
     * @param {UserSignUp} data - An object containing signup data
     * @returns {Promise<LoginResponse>} The signup response promise
     * @throws {ErrorResponse} If any signup data fails server side validation
     * @throws {Error} If api request fails
     */
    const signUp = async (data: UserSignUp): Promise<LoginResponse> => {
        try {
            const expireTime = new Date();
            const response = await axios.post("/tokens/sign_up", data);
            const userResponse: LoginResponse = response.data;
            expireTime.setSeconds(expireTime.getSeconds() + userResponse.expires_in);
            setUser({
                type: "user",
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

    /**
     * Clears global authentication context and tokens in local storage.
     */
    const clearTokens = () => {
        setUser(null);
        setToken("");
        setExpires("");
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("EXPIRE_TIME");
        localStorage.removeItem("REFRESH_TOKEN");
    };

    /**
     * Makes a logout request to the api. If successful, clears the global authentication
     * context and local storage.
     *
     * @throws {ErrorResponse} If logout fails
     * @throws {Error} If api request fails
     */
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

    /**
     * Checks if token has expired and renews it.
     *
     * @throws {Error} If api request fails
     */
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

    /**
     * Initialises user into global authentication context if valid token is found in
     * local storage.
     *
     * @throws {Error} If api request fails
     */
    const initUser = async () => {
        try {
            if (token && !user) {
                const response = await axios.get("/tokens/info");
                const userResponse: LoginResponse = response.data;
                setUser({
                    type: "user",
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

    /**
     * Initialises token and user for the authentication context.
     *
     * @returns {Promise<true>} Promise of init process.
     */
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
            signUp,
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
