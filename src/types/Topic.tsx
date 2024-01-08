import Category from "./Category";
import Like from "./Like";
import Vote from "./Vote";
import Comment from "./Comment";
import Status from "./Status";
import User from "./User";

type Topic = {
    readonly type: "post";
    readonly id: string;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
    meta: {
        comments_count: number;
        last_activity: string;
        likes: number;
        upvotes: number;
        downvotes: number;
    };
    readonly user: User;
    category: Category;
    status: Status;
    posts_likes: Like[];
    posts_votes: Vote[];
    comments?: Comment[];
};

export default Topic;
