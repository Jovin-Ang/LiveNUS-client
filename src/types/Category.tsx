import Topic from "./Topic";

type Category = {
    readonly type: "category";
    readonly id: string;
    readonly name: string;
    readonly description: string;
    posts: Topic[];
};

export default Category;
