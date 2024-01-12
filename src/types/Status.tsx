import BaseType from "./BaseType";

/**
 * Interface representing a status object
 */
interface Status extends BaseType<"status"> {
    /** Name of the status */
    name: "stickied" | "locked" | "open";
}

export default Status;
