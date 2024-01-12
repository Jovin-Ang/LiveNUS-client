import CategoryChip from "../components/CategoryChip";
import CommentItem from "../components/CommentItem";
import CommentForm from "../components/CommentForm";
import ColorAvatar from "../components/ColorAvatar";
import LikeVoteBtn from "../components/LikeVoteBtn";
import Topic from "../types/Topic";
import Comment from "../types/Comment";
import { useAuth } from "../hooks/useAuth";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
    Container,
    Box,
    Grid,
    Divider,
    Button,
    IconButton,
    Paper,
    Stack,
    Typography,
    Snackbar,
    Alert,
    AlertTitle,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate, useLoaderData } from "react-router-dom";
import Jsona from "jsona";
import axios, { isAxiosError } from "axios";

enum CommentActionKind {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
}

interface CommentAction {
    type: CommentActionKind;
    comment: Comment;
}

type ErrorResponse = {
    readonly title?: string[];
    readonly body?: string[];
    readonly submission?: string[];
};

type SubmitState = {
    buttonText: string;
    allowSubmit: boolean;
    error: ErrorResponse | null;
    success: boolean;
};

/**
 * Single topic page. Contains post title and body plus its comments.
 *
 * @returns {React.FunctionComponent} Content and elements of single topic page
 */
const TopicView: React.FC = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const dataFormatter = new Jsona();
    const postRes = useLoaderData();
    // @ts-expect-error The response passed here is a success
    const topic = dataFormatter.deserialize(postRes.data) as Topic;
    const [comments, dispatch] = React.useReducer(commentsReducer, topic.comments || []);
    console.log(topic);

    // States
    const [isEditing, setIsEditing] = useState(false);
    const [topicData, setTopicData] = useState({
        title: topic.title,
        body: topic.body,
    });
    const [titleHelperText, setTitleHelperText] = useState(topic.title.length);
    const [bodyHelperText, setBodyHelperText] = useState(topic.body.length);
    const [submission, setSubmission] = useState<SubmitState>({
        buttonText: "Save",
        allowSubmit: true,
        error: null,
        success: false,
    });
    const [deleteStatus, setDeleteStatus] = useState({
        confirmation: false,
        isDeleting: false,
        deleted: false,
    });

    // Snackbars
    const [updateTopicSnackbar, setUpdateTopicSnackbar] = React.useState(false);
    const [createSnackbar, setCreateSnackbar] = React.useState(false);
    const [updateSnackbar, setUpdateSnackbar] = React.useState(false);
    const [deleteSnackbar, setDeleteSnackbar] = React.useState(false);

    useEffect(() => {
        if (submission.success) {
            setUpdateTopicSnackbar(true);
            setTimeout(() => navigate(0), 2000);
        }
    }, [submission]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTopicData({ ...topicData, [name]: value });
        setTitleHelperText(99 - topicData.title.length);
        setBodyHelperText(500 - topicData.body.length);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSubmission((prev) => ({
            ...prev,
            allowSubmit: false,
            buttonText: "Updating topic...",
        }));
        try {
            await axios.patch("/posts/" + topic.id, {
                title: data.get("title"),
                body: data.get("body"),
            });
            topic.title = data.get("title") as string;
            topic.body = data.get("body") as string;
            setSubmission((prev) => ({
                ...prev,
                success: true,
            }));
            setIsEditing(false);
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                const errorData = e.response.data as ErrorResponse;
                setSubmission((prev) => ({
                    ...prev,
                    error: errorData,
                }));
            } else {
                setSubmission((prev) => ({
                    ...prev,
                    error: {
                        submission: ["Bad Request"],
                    },
                }));
            }
        }
        setSubmission((prev) => ({
            ...prev,
            allowSubmit: true,
            buttonText: "Save",
        }));
    };

    const handleDelete = async () => {
        setDeleteStatus({
            ...deleteStatus,
            isDeleting: true,
        });
        try {
            await axios.delete("/posts/" + topic.id);
            setDeleteStatus({
                ...deleteStatus,
                isDeleting: true,
                deleted: true,
            });
            setTimeout(() => {
                navigate("/");
            }, 5000);
        } catch (e) {
            console.log(e);
        }
    };

    const handleDialogClose = () => {
        setDeleteStatus({
            ...deleteStatus,
            confirmation: false,
        });
    };

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
                <title>{topic.title}</title>
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
                                {isEditing ? (
                                    <Box component="form" onSubmit={handleSubmit}>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            variant="filled"
                                            id="title"
                                            label="Editing subject..."
                                            name="title"
                                            value={topicData.title}
                                            helperText={titleHelperText}
                                            inputProps={{ maxLength: 99 }}
                                            onChange={handleChange}
                                            required
                                            autoFocus
                                        />
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            variant="filled"
                                            multiline
                                            minRows={5}
                                            maxRows={10}
                                            name="body"
                                            label="Editing body..."
                                            id="body"
                                            value={topicData.body}
                                            helperText={bodyHelperText}
                                            inputProps={{ maxLength: 500 }}
                                            onChange={handleChange}
                                            required
                                        />
                                        <Grid container justifyContent="flex-end">
                                            <Grid item>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => setIsEditing(false)}
                                                    sx={{ mr: 3, mb: 2 }}
                                                >
                                                    Cancel
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button
                                                    type="submit"
                                                    disabled={!submission.allowSubmit}
                                                    variant="contained"
                                                    sx={{ mb: 2 }}
                                                >
                                                    {submission.buttonText}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        {submission.error &&
                                            Object.entries(submission.error).map(([key, values]) => (
                                                <Alert key={key} severity="error">
                                                    <AlertTitle>{"Error in " + key}</AlertTitle>
                                                    {values.join(", ")}
                                                </Alert>
                                            ))}
                                    </Box>
                                ) : (
                                    <>
                                        <Typography variant="h5" sx={{ pb: 2 }}>
                                            {topic.title}
                                        </Typography>
                                        <CategoryChip id={topic.category.id} name={topic.category.name} />
                                        <Divider sx={{ pt: 1, my: 2 }} />
                                        <Typography paragraph>{topic.body}</Typography>
                                        {topic.created_at != topic.updated_at && (
                                            <Typography variant="caption" sx={{ fontStyle: "italic" }}>
                                                (edited {new Date(topic.updated_at).toLocaleString()})
                                            </Typography>
                                        )}
                                    </>
                                )}
                            </Grid>
                            <Grid xs={1} sx={{ display: { xs: "none", md: "flex" }, px: 2 }} />
                            <Grid xs>
                                <LikeVoteBtn
                                    type={"POST"}
                                    id={topic.id}
                                    upvoteCount={topic.meta.upvotes}
                                    downvoteCount={topic.meta.downvotes}
                                    likeCount={topic.meta.likes}
                                    votes={topic.posts_votes}
                                    likes={topic.posts_likes}
                                />
                            </Grid>
                            {auth?.user && auth.user.id == topic.user.id && (
                                <Grid>
                                    <IconButton
                                        onClick={() => setIsEditing(true)}
                                        disabled={isEditing}
                                        aria-label="edit"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => setDeleteStatus({ ...deleteStatus, confirmation: true })}
                                        aria-label="delete"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            )}
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
                    {topic.status.name === "locked" ? (
                        <Alert icon={<LockIcon fontSize="inherit" />} severity="info">
                            This topic has been locked to prevent further replies.
                        </Alert>
                    ) : (
                        <CommentForm
                            postId={topic.id}
                            createComment={(c: Comment) => {
                                dispatch({ type: CommentActionKind.CREATE, comment: c });
                                setCreateSnackbar(true);
                            }}
                        />
                    )}
                </Stack>
                <Snackbar open={updateTopicSnackbar} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                        Topic updated!
                    </Alert>
                </Snackbar>
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
            <Dialog
                open={deleteStatus.confirmation}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Delete this topic?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {deleteStatus.deleted
                            ? "Topic deleted, redirecting to home..."
                            : "All comments, likes and votes will be deleted as well."}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button disabled={deleteStatus.isDeleting} onClick={handleDialogClose}>
                        Cancel
                    </Button>
                    <Button disabled={deleteStatus.isDeleting} onClick={handleDelete} autoFocus>
                        {deleteStatus.isDeleting ? <CircularProgress color="inherit" /> : "Confirm"}
                    </Button>
                </DialogActions>
            </Dialog>
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
