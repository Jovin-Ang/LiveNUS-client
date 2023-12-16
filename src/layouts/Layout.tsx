import NavBar from "../components/NavBar";
import NewPostBtn from "../components/NewPostBtn";
import ScrollTop from "../components/ScrollToTop";
import Page from "../types/Page";
import React from "react";
import { Outlet } from "react-router-dom";
import { Toolbar } from "@mui/material";

type Props = {
    navBarPages: Page[];
    userPages: Page[];
    loginSignup: Page[];
    newPostPage: Page;
};
const Layout: React.FC<Props> = ({ navBarPages, userPages, loginSignup, newPostPage }) => {
    return (
        <>
            <NavBar pages={navBarPages} settings={userPages} login={loginSignup} />
            <NewPostBtn newPostPage={newPostPage} />
            <Toolbar id="back-to-top-anchor" />
            <Outlet />
            <ScrollTop />
        </>
    );
};

export default Layout;
