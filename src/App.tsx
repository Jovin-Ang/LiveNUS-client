import Layout from "./layouts/Layout";
import LoginLayout from "./layouts/LoginLayout";
import HomeView from "./pages/HomeView";
import AboutView from "./pages/AboutView";
import NoView from "./pages/NoView";
import CategoriesView from "./pages/CategoriesView";
import SingleCategoryView from "./pages/SingleCategoryView";
import TopicView from "./pages/TopicView";
import LoginView from "./pages/LoginView";
import SignUpView from "./pages/SignUpView";
import Page from "./types/Page";
import Category from "./types/Category";
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

const categories: Category[] = [
    {
        id: 1,
        name: "Music",
        description:
            "Truncation should be conditionally applicable on this long line of text as this is a much longer line than what the container can support.",
        postCount: 800,
    },
    {
        id: 2,
        name: "Idk",
        description:
            "Truncation should be conditionally applicable on this long line of text as this is a much longer line than what the container can support.",
        postCount: 564,
    },
    {
        id: 2,
        name: "Idk",
        description:
            "Truncation should be conditionally applicable on this long line of text as this is a much longer line than what the container can support.",
        postCount: 564,
    },
    {
        id: 2,
        name: "Idk",
        description:
            "Truncation should be conditionally applicable on this long line of text as this is a much longer line than what the container can support.",
        postCount: 564,
    },
];

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
                                <Route index element={<HomeView />} />
                                <Route path="categories">
                                    <Route index element={<CategoriesView categories={categories} />} />
                                    <Route path="1" element={<SingleCategoryView />} />
                                </Route>
                                <Route path="about" element={<AboutView />} />
                                <Route path="topic/1" element={<TopicView />} />
                                <Route path="*" element={<NoView />} />
                            </Route>
                            <Route element={<LoginLayout />}>
                                <Route path="/login" element={<LoginView />} />
                                <Route path="/signup" element={<SignUpView />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
            </div>
        </>
    );
};

export default App;
