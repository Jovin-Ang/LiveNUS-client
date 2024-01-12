import Header from "../components/Header";
import Category from "../types/Category";
import React, { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Typography, TextField, MenuItem, Alert, AlertTitle } from "@mui/material";
import axios, { isAxiosError } from "axios";
import { useNavigate, useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet";
import Jsona from "jsona";

type ErrorResponse = {
    readonly title?: string[];
    readonly body?: string[];
    readonly category?: string[];
    readonly category_id?: string[];
    readonly status?: string[];
    readonly status_id?: string[];
    readonly submission?: string[];
};

type SubmitState = {
    buttonText: string;
    allowSubmit: boolean;
    error: ErrorResponse | null;
    success: boolean;
    postId: string | null;
};

function checkTitle(title: string) {
    return title !== "" && title.length < 100;
}

function checkBody(body: string) {
    return body !== "" && body.length < 500;
}

function checkCategory(category: string) {
    return category !== "";
}

/**
 * New topic page. Contains a form to create a new topic.
 *
 * @returns {React.FunctionComponent} Content and elements of new topic page
 */
const NewTopicView: React.FC = () => {
    const navigate = useNavigate();
    const dataFormatter = new Jsona();
    const categoriesRes = useLoaderData();
    // @ts-expect-error The response passed here is a success
    const categories = dataFormatter.deserialize(categoriesRes.data) as Category[];

    const [newTopicData, setNewTopicData] = useState({
        title: "",
        body: "",
        category: "",
    });
    const [submission, setSubmission] = useState<SubmitState>({
        buttonText: "Create Post",
        allowSubmit: true,
        error: null,
        success: false,
        postId: null,
    });
    const [titleError, setTitleError] = useState(false);
    const [titleHelperText, setTitleHelperText] = useState(
        "Describe your topic well, while keeping the subject as short as possible.",
    );
    const [bodyError, setBodyError] = useState(false);
    const [bodyHelperText, setBodyHelperText] = useState("499");
    const [categoryError, setCategoryError] = useState(false);

    useEffect(() => {
        if (submission.success) {
            navigate(`/topic/${submission.postId}`);
        }
    }, [submission]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let clientValidate = true;
        setSubmission((prev) => ({
            ...prev,
            allowSubmit: false,
            buttonText: "Creating post...",
        }));
        if (!checkTitle(newTopicData.title)) {
            setTitleError(true);
            setTitleHelperText("Topic title is required and must be below 100 characters.");
            clientValidate = false;
        }
        if (!checkBody(newTopicData.body)) {
            setBodyError(true);
            setBodyHelperText("Topic body is required and must be below 499 characters.");
            clientValidate = false;
        }
        if (!checkCategory(newTopicData.category)) {
            setCategoryError(true);
            clientValidate = false;
        }
        if (clientValidate) {
            try {
                const res = await axios.post("/posts", {
                    title: data.get("title"),
                    category_id: data.get("category"),
                    body: data.get("body"),
                    status_id: 1,
                });
                if (res.data.data.id) {
                    setSubmission((prev) => ({
                        ...prev,
                        success: true,
                        postId: res.data.data.id,
                    }));
                }
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
            buttonText: "Create Post",
        }));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewTopicData({ ...newTopicData, [name]: value });
        setTitleHelperText((99 - newTopicData.title.length).toString());
        setBodyHelperText((500 - newTopicData.body.length).toString());
    };

    return (
        <>
            <Helmet>
                <title>New Topic</title>
            </Helmet>
            <Container maxWidth="lg">
                <Header title={"Create New Topic"} />
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <Typography variant="h6">Topic Title</Typography>
                    <TextField
                        margin="normal"
                        error={titleError}
                        fullWidth
                        variant="filled"
                        id="title"
                        label="Subject of your topic"
                        name="title"
                        value={newTopicData.title}
                        helperText={titleHelperText}
                        inputProps={{ maxLength: 99 }}
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <Typography variant="h6">Topic Body</Typography>
                    <TextField
                        margin="normal"
                        error={bodyError}
                        fullWidth
                        variant="filled"
                        multiline
                        minRows={5}
                        maxRows={10}
                        name="body"
                        label="Lets get started"
                        id="body"
                        value={newTopicData.body}
                        helperText={bodyHelperText}
                        inputProps={{ maxLength: 500 }}
                        onChange={handleChange}
                        required
                    />
                    <Typography variant="h6">Category</Typography>
                    <TextField
                        id="category"
                        error={categoryError}
                        select
                        required
                        name="category"
                        label="Select"
                        value={newTopicData.category}
                        helperText={categoryError && "Please select a category"}
                        variant="filled"
                        onChange={handleChange}
                        sx={{ minWidth: 325 }}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button
                                type="submit"
                                disabled={!submission.allowSubmit}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
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
            </Container>
        </>
    );
};

export default NewTopicView;
