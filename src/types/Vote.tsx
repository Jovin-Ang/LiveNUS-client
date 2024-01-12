import BaseType from "./BaseType";

/**
 * Interface representing a vote object. May represent a post vote or comment vote.
 */
interface Vote extends BaseType<"posts_vote" | "comments_vote"> {
    /** The vote. 1 for upvote, 2 for downvote. */
    vote: number;
}

export default Vote;
