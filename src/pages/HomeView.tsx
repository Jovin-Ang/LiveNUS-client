import TopicList from "../components/TopicList";
import React from "react";
import { Box, Container } from "@mui/material";
import { Helmet } from "react-helmet";

const HomeView: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Container maxWidth="lg">
                <Box sx={{ mt: 2.5 }} />
                <TopicList />
            </Container>
        </>
    );
};

export default HomeView;
