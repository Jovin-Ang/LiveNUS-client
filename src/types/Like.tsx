type Like = {
    readonly type: "posts_like" | "comments_like";
    id: string;
    created_at: string;
    updated_at: string;
};

export default Like;
