import * as React from "react";
import { Button, TextField, FormControlLabel, Checkbox, Link, Box, Grid, Typography } from "@mui/material";
import { Helmet } from "react-helmet";

const Login: React.FC = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    };

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Sign In
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/signup" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Login;
