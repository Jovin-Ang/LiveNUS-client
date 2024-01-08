import Like from "./Like";

type Vote = Omit<Like, "type"> & {
    readonly type: "posts_vote" | "comments_vote";
    vote: number;
};

export default Vote;
