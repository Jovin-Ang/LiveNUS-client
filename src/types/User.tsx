type User = {
    readonly type: "user";
    readonly id: string;
    readonly email?: string;
    readonly username: string;
    readonly first_name: string;
    readonly last_name: string;
};

export default User;
