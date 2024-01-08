import { useAuth } from "../hooks/useAuth";
import React, { useState, useEffect } from "react";
import { Button, TextField, Link, Box, Grid, Typography, Alert, AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

type ErrorResponse = {
    readonly error: string;
    readonly error_description: string[];
};

type SignUpState = {
    buttonText: string;
    allowSubmit: boolean;
    error: ErrorResponse | null;
    success: boolean;
};

const SignUpView: React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
    });

    const [signup, setSignup] = useState<SignUpState>({
        buttonText: "Sign Up",
        allowSubmit: true,
        error: null,
        success: false,
    });

    useEffect(() => {
        if (signup.success) {
            navigate("/");
        }
    }, [signup]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSignup((prev) => ({
            ...prev,
            allowSubmit: false,
            buttonText: "Signing up...",
        }));
        try {
            const res = await auth!.signUp({
                first_name: data.get("firstName") as string,
                last_name: data.get("lastName") as string,
                username: data.get("username") as string,
                email: data.get("email") as string,
                password: data.get("password") as string,
            });
            if (res.token) {
                setSignup((prev) => ({
                    ...prev,
                    success: true,
                }));
            }
        } catch (e) {
            if (e instanceof Error) {
                setSignup((prev) => ({
                    ...prev,
                    error: {
                        error: (e as Error).message,
                        error_description: [],
                    },
                }));
            } else {
                setSignup((prev) => ({
                    ...prev,
                    error: e as ErrorResponse,
                }));
            }
        }
        setSignup((prev) => ({
            ...prev,
            allowSubmit: true,
            buttonText: "Sign Up",
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
                <title>Sign up</title>
            </Helmet>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            value={input.firstName}
                            onChange={handleChange}
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            value={input.lastName}
                            autoComplete="family-name"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            value={input.username}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={input.email}
                            autoComplete="email"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={input.password}
                            autoComplete="new-password"
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    disabled={!signup.allowSubmit}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    {signup.buttonText}
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
                {signup.error && (
                    <Alert severity="error">
                        <AlertTitle>{signup.error.error}</AlertTitle>
                        {signup.error.error_description.join(", ")}
                    </Alert>
                )}
            </Box>
        </>
    );
};

export default SignUpView;
