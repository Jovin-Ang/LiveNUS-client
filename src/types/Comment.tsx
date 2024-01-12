import BaseType from "./BaseType";
import Like from "./Like";
import Vote from "./Vote";
import Topic from "./Topic";
import User from "./User";

/**
 * Interface representing a comment object
 */
interface Comment extends BaseType<"comment"> {
    /** Body of the comment */
    body: string;
    /**
     * Additional information about the comment. Contains number of likes, upvotes and downvotes.
     */
    meta: {
        likes: number;
        upvotes: number;
        downvotes: number;
    };
    /** Parent post of the comment */
    post: Topic;
    /** User who posted the comment */
    user: User;
    /** Array of likes for the comment */
    comments_likes: Like[];
    /** Array of votes for the comment */
    comments_votes: Vote[];
}

export default Comment;
