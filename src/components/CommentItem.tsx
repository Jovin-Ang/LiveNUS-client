import ColorAvatar from "./ColorAvatar";
import LikeVoteBtn from "./LikeVoteBtn";
import { useAuth } from "../hooks/useAuth";
import Comment from "../types/Comment";
import React, { useEffect, useState } from "react";
import { Paper, Box, Grid, Typography, Button, IconButton, TextField, Alert, AlertTitle } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios, { isAxiosError } from "axios";

type ErrorResponse = {
    readonly body?: string[];
    readonly post?: string[];
    readonly post_id?: string[];
    readonly submission?: string[];
};

type SubmitState = {
    buttonText: string;
    allowSubmit: boolean;
    error: ErrorResponse | null;
    success: boolean;
};

type Props = {
    comment: Comment;
    updateSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
    updateComment: (comment: Comment) => void;
    deleteComment: (comment: Comment) => void;
};
const CommentItem: React.FC<Props> = ({ comment, updateSnackbar, updateComment, deleteComment }) => {
    const auth = useAuth();
    const [body, setBody] = useState(comment.body);
    const [submission, setSubmission] = useState<SubmitState>({
        buttonText: "Save",
        allowSubmit: true,
        error: null,
        success: false,
    });
    const [helperText, setHelperText] = useState(comment.body.length);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (submission.success) {
            updateSnackbar(true);
            updateComment(comment);
        }
    }, [submission]);

    useEffect(() => {
        if (isDeleting) {
            setTimeout(() => {
                setIsDeleting(false);
            }, 5000);
        }
    }, [isDeleting]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSubmission((prev) => ({
            ...prev,
            allowSubmit: false,
            buttonText: "Updating reply...",
        }));
        try {
            await axios.patch("/comments/" + comment.id, {
                body: data.get("body"),
            });
            comment.body = data.get("body") as string;
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
        try {
            await axios.delete("/comments/" + comment.id);
            deleteComment(comment);
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBody(event.target.value);
        setHelperText(500 - event.target.value.length);
    };

    return (
        <Paper square elevation={0} sx={{ px: 2, py: 2.5, bgcolor: "#fff" }}>
            <Grid container alignItems="center">
                <Grid xs={2} md={1} sx={{ p: 2 }}>
                    <IconButton sx={{ p: 0 }}>
                        <ColorAvatar
                            name={comment.user.first_name.concat(" ", comment.user.last_name)}
                            source="/static/images/avatar/2.jpg"
                        />
                    </IconButton>
                </Grid>
                <Grid xs>
                    <Typography variant="subtitle1" sx={{ px: 2 }}>
                        {comment.user.username}
                    </Typography>
                </Grid>
                <Grid>
                    <Typography variant="subtitle1" sx={{ px: 2 }}>
                        {new Date(comment.created_at).toLocaleString()}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid xs={1} sx={{ display: { xs: "none", md: "flex" }, px: 2 }} />
                <Grid xs={12} md={11}>
                    {isEditing ? (
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                margin="normal"
                                fullWidth
                                variant="filled"
                                multiline
                                minRows={5}
                                maxRows={10}
                                name="body"
                                label="Editing reply..."
                                id="body"
                                value={body}
                                helperText={helperText}
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
                            <Typography paragraph sx={{ px: 2 }}>
                                {comment.body}
                            </Typography>
                            {comment.created_at != comment.updated_at && (
                                <Typography variant="caption" sx={{ fontStyle: "italic", px: 2 }}>
                                    (edited {new Date(comment.updated_at).toLocaleString()})
                                </Typography>
                            )}
                        </>
                    )}
                </Grid>
                <Grid xs={1} sx={{ display: { xs: "none", md: "flex" }, px: 2 }} />
                <Grid xs>
                    <LikeVoteBtn
                        type={"COMMENT"}
                        id={comment.id}
                        upvoteCount={comment.meta.upvotes}
                        downvoteCount={comment.meta.downvotes}
                        likeCount={comment.meta.likes}
                        votes={comment.comments_votes}
                        likes={comment.comments_likes}
                    />
                </Grid>
                {auth?.user && auth.user.id == comment.user.id && (
                    <Grid>
                        <IconButton onClick={() => setIsEditing(true)} disabled={isEditing} aria-label="edit">
                            <EditIcon />
                        </IconButton>
                        {isDeleting ? (
                            <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
                                Confirm
                            </Button>
                        ) : (
                            <IconButton onClick={() => setIsDeleting(true)} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </Grid>
                )}
            </Grid>
        </Paper>
    );
};

export default CommentItem;
