import Comment from "../types/Comment";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography, TextField, Alert, AlertTitle } from "@mui/material";
import axios, { isAxiosError } from "axios";
import Jsona from "jsona";

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
    newComment: Comment | null;
};

type Props = {
    postId: string;
    createComment: (comment: Comment) => void;
};

/**
 * A form to create a comment.
 *
 * @param {string} postId - The ID of the parent post
 * @param {(comment: Comment) => void} createComment - Function to display the created comment
 * @returns {React.FunctionComponent} A comment form
 */
const CommentForm: React.FC<Props> = ({ postId, createComment }) => {
    const dataFormatter = new Jsona();

    const [body, setBody] = useState("");
    const [submission, setSubmission] = useState<SubmitState>({
        buttonText: "Reply",
        allowSubmit: true,
        error: null,
        success: false,
        newComment: null,
    });
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState("499");

    useEffect(() => {
        if (submission.success) {
            createComment(submission.newComment!);
            window.scrollTo({ top: 0, behavior: "smooth" });
            setBody("");
            setSubmission({
                buttonText: "Reply",
                allowSubmit: true,
                error: null,
                success: false,
                newComment: null,
            });
            setError(false);
            setHelperText("499");
        }
    }, [submission]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSubmission((prev) => ({
            ...prev,
            allowSubmit: false,
            buttonText: "Posting reply...",
        }));
        if (body === "" || body.length >= 500) {
            setError(true);
            setHelperText("Comment body is required and must be below 500 characters.");
        } else {
            try {
                const res = await axios.post("/comments", {
                    body: data.get("body"),
                    post_id: postId,
                });
                const newComment = dataFormatter.deserialize(res.data) as Comment;
                setSubmission((prev) => ({
                    ...prev,
                    success: true,
                    newComment: newComment,
                }));
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
        }
        setSubmission((prev) => ({
            ...prev,
            allowSubmit: true,
            buttonText: "Reply",
        }));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBody(event.target.value);
        setHelperText((500 - body.length).toString());
    };

    return (
        <>
            <Box component="form" onSubmit={handleSubmit}>
                <Typography variant="h6">Post Your Reply</Typography>
                <TextField
                    margin="normal"
                    error={error}
                    fullWidth
                    variant="filled"
                    multiline
                    minRows={5}
                    maxRows={10}
                    name="body"
                    label="Lets get started"
                    id="body"
                    value={body}
                    helperText={helperText}
                    inputProps={{ maxLength: 500 }}
                    onChange={handleChange}
                    required
                />
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button type="submit" disabled={!submission.allowSubmit} variant="contained" sx={{ mb: 2 }}>
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
        </>
    );
};

export default CommentForm;
