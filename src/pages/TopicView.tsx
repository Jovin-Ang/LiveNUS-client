import CategoryChip from "../components/CategoryChip";
import CommentItem from "../components/CommentItem";
import ColorAvatar from "../components/ColorAvatar";
import Comment from "../types/Comment";
import React from "react";
import { Helmet } from "react-helmet";
import { Container, Grid, Divider, Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FavoriteIcon from "@mui/icons-material/Favorite";

const testComments: Comment[] = [
    {
        id: 1,
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        author: "iLoveNUS",
        likes: 1749,
        upvotes: 97,
        downvotes: 8,
        timestamp: new Date(),
    },
    {
        id: 2,
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        author: "iHelloMyWorld",
        likes: 1749,
        upvotes: 97,
        downvotes: 8,
        timestamp: new Date(),
    },
];

const TopicView: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>My post title</title>
            </Helmet>
            <Container maxWidth="lg">
                <Stack spacing={2}>
                    <Paper square elevation={0} sx={{ px: 2, py: 2.5, bgcolor: "#fff" }}>
                        <Grid container alignItems="center">
                            <Grid xs={2} md={1} sx={{ p: 2 }}>
                                <IconButton sx={{ p: 0 }}>
                                    <ColorAvatar name={"comment.author"} source="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Grid>
                            <Grid xs>
                                <Typography variant="subtitle1" sx={{ px: 2 }}>
                                    {"comment.author"}
                                </Typography>
                            </Grid>
                            <Grid>
                                <Typography variant="subtitle1" sx={{ px: 2 }}>
                                    {"8 June"}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid xs={1} sx={{ display: { xs: "none", md: "flex" }, px: 2 }} />
                            <Grid xs={12} md={11} sx={{ px: 2 }}>
                                <Typography variant="h5" sx={{ pb: 2 }}>
                                    {"My very nice title"}
                                </Typography>
                                <CategoryChip id={1} name={"Music"} />
                                <Divider sx={{ pt: 1, my: 2 }} />
                                <Typography paragraph>hi</Typography>
                            </Grid>
                            <Grid xs={1} sx={{ display: { xs: "none", md: "flex" }, px: 2 }} />
                            <Grid xs={12} md={11}>
                                <Button startIcon={<ThumbUpIcon />}>{9}</Button>
                                <Button startIcon={<ThumbDownIcon />}>{800}</Button>
                                <Button startIcon={<FavoriteIcon />}>{0}</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                    {testComments.map((comment) => (
                        <CommentItem key={comment.id} comment={comment} />
                    ))}
                </Stack>
            </Container>
        </>
    );
};

export default TopicView;
