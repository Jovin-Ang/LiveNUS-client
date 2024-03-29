import Header from "../components/Header";
import TopicList from "../components/TopicList";
import Category from "../types/Category";
import React from "react";
import { Container } from "@mui/material";
import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";
import Jsona from "jsona";

/**
 * Single category page. Lists all posts from the category.
 *
 * @returns {React.FunctionComponent} Content and elements of single category page
 */
const SingleCategoryView: React.FC = () => {
    const dataFormatter = new Jsona();
    const categoryRes = useLoaderData();
    // @ts-expect-error The response passed here is a success
    const category = dataFormatter.deserialize(categoryRes.data) as Category;

    return (
        <>
            <Helmet>
                <title>{category.name}</title>
            </Helmet>
            <Container maxWidth="lg">
                <Header title={category.name} />
                <TopicList topics={category.posts} />
            </Container>
        </>
    );
};

export default SingleCategoryView;
