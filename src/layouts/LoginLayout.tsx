import * as React from "react";
import { Outlet } from "react-router-dom";
import { Avatar, Paper, Box, Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

/**
 * Shared user interface design for login and signup pages
 *
 * @returns {React.FunctionComponent} The LoginLayout component
 */
const LoginLayout: React.FC = () => {
    return (
        <Grid container component="main" sx={{ height: "100vh" }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Outlet />
                </Box>
            </Grid>
        </Grid>
    );
};

export default LoginLayout;
