import { useAuth } from "../hooks/useAuth";
import Like from "../types/Like";
import Vote from "../types/Vote";
import React, { useState } from "react";
import { Button, Snackbar, Alert } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";

enum VoteType {
    UPVOTE = 1,
    DOWNVOTE = 2,
    RETRACT = 3,
}

type Props = {
    type: "POST" | "COMMENT";
    id: string;
    upvoteCount: number;
    downvoteCount: number;
    likeCount: number;
    votes: Vote[];
    likes: Like[];
};

const LikeVoteBtn: React.FC<Props> = ({ type, id, upvoteCount, downvoteCount, likeCount, votes, likes }) => {
    const auth = useAuth();

    // Check for existing vote
    const curUserVote = votes.find((vote) => JSON.parse(vote.id)[1] === auth!.user!.id);

    // States
    const [voteDisplay, setVoteDisplay] = useState({
        upvotes: upvoteCount,
        downvotes: downvoteCount,
    });
    const [likeDisplay, setLikeDisplay] = useState(likeCount);
    const [curUserInteraction, setCurUserInteraction] = useState({
        upvote: curUserVote ? curUserVote.vote === VoteType.UPVOTE : false,
        downvote: curUserVote ? curUserVote.vote === VoteType.DOWNVOTE : false,
        like: likes.some((like) => JSON.parse(like.id)[1] === auth!.user!.id),
    });

    // Snackbar
    const [alertSnackbar, setAlertSnackbar] = useState(false);

    // Vote function
    const handleVote = async (vote: number) => {
        try {
            await axios.post(`/${type.toLowerCase()}s/${id}/vote`, {
                vote: vote,
            });
            setCurUserInteraction({
                ...curUserInteraction,
                upvote: vote === VoteType.UPVOTE,
                downvote: vote === VoteType.DOWNVOTE,
            });
            switch (vote) {
                case VoteType.UPVOTE:
                    setVoteDisplay({
                        upvotes: voteDisplay.upvotes + 1,
                        downvotes: curUserInteraction.downvote ? voteDisplay.downvotes - 1 : voteDisplay.downvotes,
                    });
                    break;
                case VoteType.DOWNVOTE:
                    setVoteDisplay({
                        upvotes: curUserInteraction.upvote ? voteDisplay.upvotes - 1 : voteDisplay.upvotes,
                        downvotes: voteDisplay.downvotes + 1,
                    });
                    break;
                case VoteType.RETRACT:
                    setVoteDisplay({
                        upvotes: curUserInteraction.upvote ? voteDisplay.upvotes - 1 : voteDisplay.upvotes,
                        downvotes: curUserInteraction.downvote ? voteDisplay.downvotes - 1 : voteDisplay.downvotes,
                    });
                    break;
            }
        } catch (e) {
            setAlertSnackbar(true);
        }
    };

    // Like function (1 for like, 2 to retract)
    const handleLike = async (like: number) => {
        try {
            await axios.post(`/${type.toLowerCase()}s/${id}/like`, {
                like: like,
            });
            setCurUserInteraction({
                ...curUserInteraction,
                like: like === 1,
            });
            setLikeDisplay(like === 1 ? likeDisplay + 1 : likeDisplay - 1);
        } catch (e) {
            setAlertSnackbar(true);
        }
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setAlertSnackbar(false);
    };

    return (
        <>
            {curUserInteraction.upvote ? (
                <Button
                    color="success"
                    size="large"
                    startIcon={<ThumbUpIcon />}
                    onClick={() => handleVote(VoteType.RETRACT)}
                >
                    {voteDisplay.upvotes}
                </Button>
            ) : (
                <Button
                    color="inherit"
                    size="large"
                    startIcon={<ThumbUpOutlinedIcon />}
                    onClick={() => handleVote(VoteType.UPVOTE)}
                >
                    {voteDisplay.upvotes}
                </Button>
            )}
            {curUserInteraction.downvote ? (
                <Button
                    color="error"
                    size="large"
                    startIcon={<ThumbDownIcon />}
                    onClick={() => handleVote(VoteType.RETRACT)}
                >
                    {voteDisplay.downvotes}
                </Button>
            ) : (
                <Button
                    color="inherit"
                    size="large"
                    startIcon={<ThumbDownOutlinedIcon />}
                    onClick={() => handleVote(VoteType.DOWNVOTE)}
                >
                    {voteDisplay.downvotes}
                </Button>
            )}
            {curUserInteraction.like ? (
                <Button color="secondary" size="large" startIcon={<FavoriteIcon />} onClick={() => handleLike(2)}>
                    {likeDisplay}
                </Button>
            ) : (
                <Button color="inherit" size="large" startIcon={<FavoriteBorderIcon />} onClick={() => handleLike(1)}>
                    {likeDisplay}
                </Button>
            )}
            <Snackbar open={alertSnackbar} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                    Error liking/voting!
                </Alert>
            </Snackbar>
        </>
    );
};

export default LikeVoteBtn;
