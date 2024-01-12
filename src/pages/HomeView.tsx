import TopicList from "../components/TopicList";
import Topic from "../types/Topic";
import React from "react";
import { Box, Container } from "@mui/material";
import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";
import Jsona from "jsona";

/**
 * Landing page of the forum. Lists all posts.
 *
 * @returns {React.FunctionComponent} Content and elements of landing page
 */
const HomeView: React.FC = () => {
    const dataFormatter = new Jsona();
    const postsRes = useLoaderData();
    // @ts-expect-error The response passed here is a success
    const posts = dataFormatter.deserialize(postsRes.data) as Topic[];

    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Container maxWidth="lg">
                <Box sx={{ mt: 2.5 }} />
                <TopicList topics={posts} />
            </Container>
        </>
    );
};

export default HomeView;
