import BaseType from "./BaseType";
import Topic from "./Topic";

/**
 * Interface representing a category object
 */
interface Category extends BaseType<"category"> {
    /** Name of category */
    readonly name: string;
    /** Description of category */
    readonly description: string;
    /** Array of posts belonging to the category */
    posts: Topic[];
}

export default Category;
