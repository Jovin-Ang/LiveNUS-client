import CategoryChip from "../components/CategoryChip";
import Header from "../components/Header";
import Category from "../types/Category";
import React from "react";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";
import Jsona from "jsona";

const CategoriesView: React.FC = () => {
    const dataFormatter = new Jsona();
    const categoriesRes = useLoaderData();
    // @ts-expect-error The response passed here is a success
    const categories = dataFormatter.deserialize(categoriesRes.data) as Category[];

    return (
        <>
            <Helmet>
                <title>Categories</title>
            </Helmet>
            <Container maxWidth="lg">
                <Header title={"Categories"} />
                <Grid container spacing={4}>
                    {categories.map((category) => (
                        <Grid item key={category.id} xs={12} sm={6} md={4}>
                            <Card square elevation={0} sx={{ height: "100%" }}>
                                <CardContent>
                                    <Grid container alignItems="center" sx={{ mb: 2 }}>
                                        <Grid item xs>
                                            <CategoryChip id={category.id} name={category.name} />
                                        </Grid>
                                        <Grid item>
                                            <Typography>Threads - {category.posts.length}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Typography>{category.description}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default CategoriesView;
