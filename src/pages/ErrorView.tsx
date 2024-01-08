import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { Helmet } from "react-helmet";

const ErrorView: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>500</title>
            </Helmet>
            <Container maxWidth="lg">
                <Box sx={{ pt: 3 }} />
                <Typography component="h1" variant="h2" align="center" gutterBottom>
                    500
                </Typography>
                <Typography variant="h5" align="center">
                    Uh oh, we did an oopsie.
                </Typography>
            </Container>
        </>
    );
};

export default ErrorView;
