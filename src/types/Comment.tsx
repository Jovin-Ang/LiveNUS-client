type Comment = {
    id: number;
    body: string;
    author: string;
    likes: number;
    upvotes: number;
    downvotes: number;
    timestamp: Date;
};

export default Comment;
