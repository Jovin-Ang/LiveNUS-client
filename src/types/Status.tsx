type Status = {
    type: "status";
    id: string;
    name: "stickied" | "locked" | "open";
};

export default Status;
