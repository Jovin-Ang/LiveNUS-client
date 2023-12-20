import Header from "../components/Header";
import React from "react";
import { Container, Typography } from "@mui/material";
import { Helmet } from "react-helmet";

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
