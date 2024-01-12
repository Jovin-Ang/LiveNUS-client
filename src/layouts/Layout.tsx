import NavBar from "../components/NavBar";
import NewPostBtn from "../components/NewPostBtn";
import ScrollTop from "../components/ScrollToTop";
import Page from "../types/Page";
import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { Toolbar, LinearProgress } from "@mui/material";

type Props = {
    navBarPages: Page[];
    userPages: Page[];
    loginSignup: Page[];
    newPostPage: Page;
};

/**
 * Base user interface design layout for the forum pages, contains navigation bar, scroll to
 * top button and loading bar should navigation be in a loading state.
 *
 * @param {Page[]} navBarPages - An array of pages to transform into buttons on the navigation
 * bar
 * @param {Page[]} userPages - An array of pages to transform into buttons on the user menu
 * @param {Page[]} loginSignup - An array of pages defining the login and signup routes for
 * the navigation bar
 * @param {Page[]} newPostPage - A Page object defining the route for creating a new post
 * @returns {React.FunctionComponent} The Layout component
 */
const Layout: React.FC<Props> = ({ navBarPages, userPages, loginSignup, newPostPage }) => {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    return (
        <>
            {isLoading && <LinearProgress />}
            <NavBar pages={navBarPages} settings={userPages} login={loginSignup} />
            <NewPostBtn newPostPage={newPostPage} />
            <Toolbar id="back-to-top-anchor" sx={{ minHeight: { xs: "5px", sm: "10px" } }} disableGutters />
            <Outlet />
            <ScrollTop />
        </>
    );
};

export default Layout;
