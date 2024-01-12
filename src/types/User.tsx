/**
 * Interface representing a user object
 */
interface User {
    /** Type of object, "user" in this case. */
    readonly type: "user";
    /** ID of user */
    readonly id: number;
    /** Email of user */
    readonly email?: string;
    /** User's forum username */
    readonly username: string;
    /** First name of user */
    readonly first_name: string;
    /** Last name of user */
    readonly last_name: string;
}

export default User;
