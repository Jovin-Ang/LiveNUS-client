import ColorAvatar from "./ColorAvatar";
import Comment from "../types/Comment";
import React from "react";
import { Paper, Grid, Typography, Button, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FavoriteIcon from "@mui/icons-material/Favorite";

type Props = {
    comment: Comment;
};
const CommentItem: React.FC<Props> = ({ comment }) => {
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
                    <Typography paragraph sx={{ px: 2 }}>
                        {comment.body}
                    </Typography>
                </Grid>
                <Grid xs={1} sx={{ display: { xs: "none", md: "flex" }, px: 2 }} />
                <Grid xs={12} md={11}>
                    <Button startIcon={<ThumbUpIcon />}>{comment.meta.upvotes}</Button>
                    <Button startIcon={<ThumbDownIcon />}>{comment.meta.downvotes}</Button>
                    <Button startIcon={<FavoriteIcon />}>{comment.meta.likes}</Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CommentItem;
