import BaseType from "./BaseType";

/**
 * Interface representing a like object. May represent a post like or comment like.
 */
interface Like extends BaseType<"posts_like" | "comments_like"> {}

export default Like;
