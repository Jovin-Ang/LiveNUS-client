import Like from "./Like";
import Vote from "./Vote";
import Topic from "./Topic";
import User from "./User";

type Comment = {
    readonly type: "comment";
    id: string;
    body: string;
    created_at: string;
    updated_at: string;
    meta: {
        likes: number;
        upvotes: number;
        downvotes: number;
    };
    post: Topic;
    user: User;
    comments_likes: Like[];
    comments_votes: Vote[];
};

export default Comment;
