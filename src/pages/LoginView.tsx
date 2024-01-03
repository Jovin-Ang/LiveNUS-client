import { useAuth } from "../hooks/useAuth";
import React, { useState, useEffect } from "react";
import {
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Box,
    Grid,
    Typography,
    Alert,
    AlertTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

type ErrorResponse = {
    readonly error: string;
    readonly error_description: string[];
};

type LoginState = {
    buttonText: string;
    allowSubmit: boolean;
    error: ErrorResponse | null;
    success: boolean;
};

const LoginView: React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const [login, setLogin] = useState<LoginState>({
        buttonText: "Sign In",
        allowSubmit: true,
        error: null,
        success: false,
    });

    useEffect(() => {
        if (login.success) {
            navigate("/");
        }
    }, [login]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setLogin((prev) => ({
            ...prev,
            allowSubmit: false,
            buttonText: "Logging in...",
        }));
        try {
            const res = await auth!.login({
                email: data.get("email") as string,
                password: data.get("password") as string,
            });
            if (res.token) {
                setLogin((prev) => ({
                    ...prev,
                    success: true,
                }));
            }
        } catch (e) {
            console.log(e);
            if (e instanceof Error) {
                setLogin((prev) => ({
                    ...prev,
                    error: {
                        error: (e as Error).message,
                        error_description: [],
                    },
                }));
            } else {
                setLogin((prev) => ({
                    ...prev,
                    error: e as ErrorResponse,
                }));
            }
        }
        setLogin((prev) => ({
            ...prev,
            allowSubmit: true,
            buttonText: "Sign In",
        }));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={input.email}
                    autoComplete="email"
                    onChange={handleChange}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    value={input.password}
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                />
                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                <Button type="submit" disabled={!login.allowSubmit} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    {login.buttonText}
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/signup" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
                {login.error && (
                    <Alert severity="error">
                        <AlertTitle>{login.error.error}</AlertTitle>
                        {login.error.error_description.join("<br>")}
                    </Alert>
                )}
            </Box>
        </>
    );
};

export default LoginView;
