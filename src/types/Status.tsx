type Status = {
    type: "status";
    id: string;
    name: "stickied" | "closed" | "open";
};

export default Status;
