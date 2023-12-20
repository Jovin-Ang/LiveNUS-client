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
                        <ColorAvatar name={topic.username} source="/static/images/avatar/2.jpg" />
                    </IconButton>
                </Grid>
                <Grid xs={10} md={6} sx={{ display: "flex" }}>
                    {topic.status === "stickied" && <PushPinIcon />}
                    {topic.status === "closed" && <LockIcon />}
                    <Typography
                        variant="subtitle1"
                        component="a"
                        href="/topic/1"
                        sx={{ px: 2, color: "inherit", textDecoration: "none", "&:hover": { color: "primary.main" } }}
                    >
                        {topic.name}
                    </Typography>
                </Grid>
                <Grid xs={0} md={2} sx={{ display: { xs: "none", md: "flex" }, px: 2 }}>
                    <CategoryChip id={1} name={topic.category} />
                </Grid>
                <Grid container xs={0} md={3} sx={{ display: { xs: "none", md: "flex" } }}>
                    <Grid item xs>
                        <Typography variant="subtitle1" sx={{ px: 2 }}>
                            {topic.likes}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="subtitle1" sx={{ px: 2 }}>
                            {topic.replies}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="subtitle1" sx={{ px: 2 }}>
                            {topic.activity}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default TopicItem;
