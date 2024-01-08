import CategoryChip from "./CategoryChip";
import ColorAvatar from "./ColorAvatar";
import Topic from "../types/Topic";
import React from "react";
import { Paper, Grid, Typography, IconButton } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PushPinIcon from "@mui/icons-material/PushPin";

type Props = {
    topic: Topic;
    color: string;
};
const TopicItem: React.FC<Props> = ({ topic, color }) => {
    return (
        <Paper square elevation={0} sx={{ px: 2, py: 2.5, bgcolor: color }}>
            <Grid container alignItems="center">
                <Grid xs={2} md={1} sx={{ p: 2 }}>
                    <IconButton sx={{ p: 0 }}>
                        <ColorAvatar
                            name={topic.user.first_name.concat(" ", topic.user.last_name)}
                            source="/static/images/avatar/2.jpg"
                        />
                    </IconButton>
                </Grid>
                <Grid xs={10} md={6} sx={{ display: "flex" }}>
                    {topic.status.name === "stickied" && <PushPinIcon />}
                    {topic.status.name === "closed" && <LockIcon />}
                    <Typography
                        variant="subtitle1"
                        component="a"
                        href={`/topic/${topic.id}`}
                        sx={{ px: 2, color: "inherit", textDecoration: "none", "&:hover": { color: "primary.main" } }}
                    >
                        {topic.title}
                    </Typography>
                </Grid>
                <Grid xs={0} md={2} sx={{ display: { xs: "none", md: "flex" }, px: 2 }}>
                    <CategoryChip id={topic.category.id} name={topic.category.name} />
                </Grid>
                <Grid container xs={0} md={3} sx={{ display: { xs: "none", md: "flex" } }}>
                    <Grid item xs>
                        <Typography variant="subtitle1" sx={{ px: 2 }}>
                            {topic.meta.likes}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="subtitle1" sx={{ px: 2 }}>
                            {topic.meta.comments_count}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="subtitle1" sx={{ px: 2 }}>
                            1h
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default TopicItem;
