import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { Helmet } from "react-helmet";

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
                    Uh oh, you did an oppsie.
                </Typography>
            </Container>
        </>
    );
};

export default NoView;
