import Header from "../components/Header";
import TopicList from "../components/TopicList";
import React from "react";
import { Container } from "@mui/material";
import { Helmet } from "react-helmet";

const SingleCategoryView: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Music</title>
            </Helmet>
            <Container maxWidth="lg">
                <Header title={"Music"} />
                <TopicList />
            </Container>
        </>
    );
};

export default SingleCategoryView;
