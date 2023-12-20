import BasicThreadList from "../components/BasicThreadList";
import TopicList from "../components/TopicList";
import React from "react";
import { Container } from "@mui/material";
import { Helmet } from "react-helmet";

const HomeView: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Container maxWidth="lg">
                <TopicList />
            </Container>
            <h3>{"Welcome to LiveNUS! Here's a basic list of forum threads for you to experiment with."}</h3>
            <br />
            <BasicThreadList />
        </>
    );
};

export default HomeView;
