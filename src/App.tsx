import Layout from "./layouts/Layout";
import LoginLayout from "./layouts/LoginLayout";
import Home from "./pages/Home";
import BasicThreadView from "./pages/BasicThreadView";
import StyledThreadView from "./pages/StyledThreadView";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Page from "./types/Page";
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, orange } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: orange,
        background: {
            default: "#f8f9fb",
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: "#fff",
                    color: "#000",
                },
            },
        },
    },
});

const navBarPages: Page[] = [
    { route: "/categories", name: "Categories" },
    { route: "/new", name: "New" },
    { route: "/about", name: "About" },
];

const userPages: Page[] = [
    { route: "/profile", name: "Profile" },
    { route: "/account", name: "Account" },
    { route: "/logout", name: "Logout" },
];

const loginSignup: Page[] = [
    { route: "/login", name: "Log in" },
    { route: "/signup", name: "Sign Up" },
];

const newPostPage: Page = { route: "/new", name: "New" };

const App: React.FC = () => {
    return (
        <>
            <Helmet defaultTitle="LiveNUS" titleTemplate="LiveNUS - %s"></Helmet>
            <div className="App">
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Layout
                                        navBarPages={navBarPages}
                                        userPages={userPages}
                                        loginSignup={loginSignup}
                                        newPostPage={newPostPage}
                                    />
                                }
                            >
                                <Route index element={<Home />} />
                                <Route path="thread/1" element={<BasicThreadView />} />
                                <Route path="thread/1/styled" element={<StyledThreadView />} />
                            </Route>
                            <Route element={<LoginLayout />}>
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<SignUp />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
            </div>
        </>
    );
};

export default App;
