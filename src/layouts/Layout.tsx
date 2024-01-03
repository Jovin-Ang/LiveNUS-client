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
