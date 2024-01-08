import CategoryChip from "../components/CategoryChip";
import CommentItem from "../components/CommentItem";
import ColorAvatar from "../components/ColorAvatar";
import Topic from "../types/Topic";
import React from "react";
import { Helmet } from "react-helmet";
import { Container, Grid, Divider, Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useLoaderData } from "react-router-dom";
import Jsona from "jsona";

const TopicView: React.FC = () => {
    const dataFormatter = new Jsona();
    const postRes = useLoaderData();
    // @ts-expect-error The response passed here is a success
    const topic = dataFormatter.deserialize(postRes.data) as Topic;

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
                                    <ColorAvatar
                                        name={topic.user.first_name.concat(" ", topic.user.last_name)}
                                        source="/static/images/avatar/2.jpg"
                                    />
                                </IconButton>
                            </Grid>
                            <Grid xs>
                                <Typography variant="subtitle1" sx={{ px: 2 }}>
                                    {topic.user.username}
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
                                    {topic.title}
                                </Typography>
                                <CategoryChip id={topic.category.id} name={topic.category.name} />
                                <Divider sx={{ pt: 1, my: 2 }} />
                                <Typography paragraph>{topic.body}</Typography>
                            </Grid>
                            <Grid xs={1} sx={{ display: { xs: "none", md: "flex" }, px: 2 }} />
                            <Grid xs={12} md={11}>
                                <Button startIcon={<ThumbUpIcon />}>{topic.meta.upvotes}</Button>
                                <Button startIcon={<ThumbDownIcon />}>{topic.meta.downvotes}</Button>
                                <Button startIcon={<FavoriteIcon />}>{topic.meta.likes}</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                    {topic.comments &&
                        topic.comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)}
                </Stack>
            </Container>
        </>
    );
};

export default TopicView;
