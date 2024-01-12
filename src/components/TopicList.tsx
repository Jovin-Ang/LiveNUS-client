import TopicItem from "./TopicItem";
import Topic from "../types/Topic";
import React from "react";
import { Grid, Stack, Typography } from "@mui/material";

type Props = {
    topics: Topic[];
};

/**
 * A formatted stack of posts with header.
 *
 * @param {Topic[]} topics - Array of posts
 * @returns {React.FunctionComponent} Stack of posts
 */
const TopicList: React.FC<Props> = ({ topics }) => {
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
                {topics
                    .filter((topic) => topic.status.name === "stickied")
                    .map((topic, i) => (
                        <TopicItem key={"s" + i} topic={topic} color={"#f9efe3"} />
                    ))}
                {topics
                    .filter((topic) => topic.status.name !== "stickied")
                    .map((topic, i) => (
                        <TopicItem key={"n" + i} topic={topic} color={i % 2 === 1 ? "#fff" : "#f2f4f6"} />
                    ))}
            </Stack>
        </>
    );
};

export default TopicList;
