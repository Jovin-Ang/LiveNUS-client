type Topic = {
    id: number;
    name: string;
    category: string;
    status: "stickied" | "closed" | "open";
    likes: number;
    replies: number;
    activity: string;
    userid: number;
    username: string;
};

export default Topic;
