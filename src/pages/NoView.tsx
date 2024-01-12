import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { Helmet } from "react-helmet";

/**
 * 404 page. Used for when page is not found.
 *
 * @returns {React.FunctionComponent} Content and elements of 404 page
 */
const NoView: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>404</title>
            </Helmet>
            <Container maxWidth="lg">
                <Box sx={{ pt: 3 }} />
                <Typography component="h1" variant="h2" align="center" gutterBottom>
                    404
                </Typography>
                <Typography variant="h5" align="center">
                    Uh oh, you did an oopsie.
                </Typography>
            </Container>
        </>
    );
};

export default NoView;
