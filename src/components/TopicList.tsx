import TopicItem from "./TopicItem";
import Topic from "../types/Topic";
import React from "react";
import { Grid, Stack, Typography } from "@mui/material";

const testTopics: Topic[] = [
    {
        id: 100,
        name: "Truncation should be conditionally applicable on this long line of text as this is a much longer line than what the container can support.",
        category: "Music",
        status: "open",
        likes: 985,
        replies: 502,
        activity: "1h",
        userid: 806,
        username: "Remy Sharp",
    },
    {
        id: 100,
        name: "Closed thread, cannot reply.",
        category: "Music",
        status: "closed",
        likes: 985,
        replies: 502,
        activity: "1h",
        userid: 806,
        username: "Travis Howard",
    },
    {
        id: 100,
        name: "Stickied announcement. This should always be at the top",
        category: "Music",
        status: "stickied",
        likes: 985,
        replies: 502,
        activity: "1h",
        userid: 806,
        username: "Cindy Baker",
    },
    {
        id: 100,
        name: "Truncation should be conditionally applicable on this long line of text as this is a much longer line than what the container can support.",
        category: "Music",
        status: "open",
        likes: 985,
        replies: 502,
        activity: "1h",
        userid: 806,
        username: "Kent Dodds",
    },
    {
        id: 100,
        name: "Truncation should be conditionally applicable on this long line of text as this is a much longer line than what the container can support.",
        category: "Music",
        status: "open",
        likes: 985,
        replies: 502,
        activity: "1h",
        userid: 806,
        username: "Jed Watson",
    },
    {
        id: 100,
        name: "Truncation should be conditionally applicable on this long line of text as this is a much longer line than what the container can support.",
        category: "Music",
        status: "open",
        likes: 985,
        replies: 502,
        activity: "1h",
        userid: 806,
        username: "Tim Neutkens",
    },
    {
        id: 100,
        name: "Stickied announcement 2. This should always be at the top",
        category: "Music",
        status: "stickied",
        likes: 985,
        replies: 502,
        activity: "1h",
        userid: 806,
        username: "Remy Sharp",
    },
];
const TopicList: React.FC = () => {
    return (
        <>
            <Grid container sx={{ px: 2, py: 2.5 }}>
                <Grid xs={12} md={7}>
                    <Typography variant="subtitle1" sx={{ px: 2 }}>
                        Topic
                    </Typography>
                </Grid>
                <Grid xs={0} md={2} sx={{ display: { xs: "none", md: "flex" } }}>
                    <Typography variant="subtitle1" sx={{ px: 2 }}>
                        Category
                    </Typography>
                </Grid>
                <Grid container xs={0} md={3} sx={{ display: { xs: "none", md: "flex" } }}>
                    <Grid item xs>
                        <Typography variant="subtitle1" sx={{ px: 2 }}>
                            Likes
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="subtitle1" sx={{ px: 2 }}>
                            Replies
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="subtitle1" sx={{ px: 2 }}>
                            Activity
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Stack>
                {testTopics
                    .filter((topic) => topic.status === "stickied")
                    .map((topic, i) => (
                        <TopicItem key={"s" + i} topic={topic} color={"#f9efe3"} />
                    ))}
                {testTopics
                    .filter((topic) => topic.status !== "stickied")
                    .map((topic, i) => (
                        <TopicItem key={"n" + i} topic={topic} color={i % 2 === 1 ? "#fff" : "#f2f4f6"} />
                    ))}
            </Stack>
        </>
    );
};

export default TopicList;
