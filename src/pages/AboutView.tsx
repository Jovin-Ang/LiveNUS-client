import Header from "../components/Header";
import React from "react";
import { Container, Typography } from "@mui/material";
import { Helmet } from "react-helmet";

/**
 * About page. Contains a short writeup about the forum.
 *
 * @returns {React.FunctionComponent} Content and elements of about page
 */
const AboutView: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>About</title>
            </Helmet>
            <Container maxWidth="lg">
                <Header title={"About"} />
                <Typography gutterBottom variant="h4">
                    About
                </Typography>
                <Typography paragraph>Welcome to forum.</Typography>
            </Container>
        </>
    );
};

export default AboutView;
