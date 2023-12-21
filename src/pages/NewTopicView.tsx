import Header from "../components/Header";
import React, { useState } from "react";
import { Box, Button, Container, Grid, Typography, TextField, MenuItem } from "@mui/material";
import { Helmet } from "react-helmet";

function checkTitle(title: string) {
    return title !== "" && title.length < 100;
}

function checkBody(body: string) {
    return body !== "" && body.length < 500;
}

function checkCategory(category: string) {
    return category !== "";
}

const NewTopicView: React.FC = () => {
    const [newTopicData, setNewTopicData] = useState({
        title: "",
        body: "",
        category: "",
    });
    const [titleError, setTitleError] = useState(false);
    const [titleHelperText, setTitleHelperText] = useState(
        "Describe your topic well, while keeping the subject as short as possible.",
    );
    const [bodyError, setBodyError] = useState(false);
    const [bodyHelperText, setBodyHelperText] = useState("499");
    const [categoryError, setCategoryError] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            title: data.get("title"),
            category: data.get("category"),
            body: data.get("body"),
        });
        if (!checkTitle(newTopicData.title)) {
            setTitleError(true);
            setTitleHelperText("Topic title is required and must be below 100 characters.");
        }
        if (!checkBody(newTopicData.body)) {
            setBodyError(true);
            setBodyHelperText("Topic body is required and must be below 499 characters.");
        }
        if (!checkCategory(newTopicData.category)) {
            setCategoryError(true);
        }
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
                        {/*{currencies.map((option) => (*/}
                        {/*    <MenuItem key={option.value} value={option.value}>*/}
                        {/*        {option.label}*/}
                        {/*    </MenuItem>*/}
                        {/*))}*/}
                        <MenuItem key={1} value={1}>
                            Music
                        </MenuItem>
                    </TextField>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Create Post
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default NewTopicView;
