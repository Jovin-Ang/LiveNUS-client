import TopicList from "../components/TopicList";
import React from "react";
import { Box, Container } from "@mui/material";
import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";
import Jsona from "jsona";

const HomeView: React.FC = () => {
    const dataFormatter = new Jsona();
    const postsRes = useLoaderData();
    // @ts-expect-error The response passed here is a success
    const posts = dataFormatter.deserialize(postsRes.data);

    console.log(posts);
    // TODO
    // Render posts

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
