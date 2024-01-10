import CategoryChip from "../components/CategoryChip";
import CommentItem from "../components/CommentItem";
import CommentForm from "../components/CommentForm";
import ColorAvatar from "../components/ColorAvatar";
import Topic from "../types/Topic";
import Comment from "../types/Comment";
import React, { useReducer } from "react";
import { Helmet } from "react-helmet";
import { Container, Grid, Divider, Button, IconButton, Paper, Stack, Typography, Snackbar, Alert } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useLoaderData } from "react-router-dom";
import Jsona from "jsona";

enum CommentActionKind {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
}

interface CommentAction {
    type: CommentActionKind;
    comment: Comment;
}

const TopicView: React.FC = () => {
    const dataFormatter = new Jsona();
    const postRes = useLoaderData();
    // @ts-expect-error The response passed here is a success
    const topic = dataFormatter.deserialize(postRes.data) as Topic;
    const [comments, dispatch] = useReducer(commentsReducer, topic.comments || []);

    // Snackbars
    const [createSnackbar, setCreateSnackbar] = React.useState(false);
    const [updateSnackbar, setUpdateSnackbar] = React.useState(false);
    const [deleteSnackbar, setDeleteSnackbar] = React.useState(false);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setCreateSnackbar(false);
        setUpdateSnackbar(false);
        setDeleteSnackbar(false);
    };

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
                                    {new Date(topic.created_at).toLocaleString()}
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
                    {!!comments.length &&
                        comments.map((comment) => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                updateSnackbar={setUpdateSnackbar}
                                updateComment={(c) => dispatch({ type: CommentActionKind.UPDATE, comment: c })}
                                deleteComment={(c) => {
                                    dispatch({ type: CommentActionKind.DELETE, comment: c });
                                    setDeleteSnackbar(true);
                                }}
                            />
                        ))}
                    <CommentForm
                        postId={topic.id}
                        createComment={(c: Comment) => {
                            dispatch({ type: CommentActionKind.CREATE, comment: c });
                            setCreateSnackbar(true);
                        }}
                    />
                </Stack>
                <Snackbar open={createSnackbar} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                        Reply posted!
                    </Alert>
                </Snackbar>
                <Snackbar open={updateSnackbar} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                        Reply updated!
                    </Alert>
                </Snackbar>
                <Snackbar open={deleteSnackbar} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                        Reply deleted!
                    </Alert>
                </Snackbar>
            </Container>
        </>
    );
};

// Reducer function for comments
const commentsReducer = (comments: Comment[], action: CommentAction) => {
    const { type, comment } = action;
    switch (type) {
        case CommentActionKind.CREATE:
            return [comment, ...comments];
        case CommentActionKind.UPDATE:
            return comments.map((c) => (c.id === comment.id ? comment : c));
        case CommentActionKind.DELETE:
            return comments.filter((c) => c.id !== comment.id);
        default:
            return comments;
    }
};

export default TopicView;
