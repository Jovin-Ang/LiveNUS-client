import { stringToColor } from "./CategoryChip";
import * as React from "react";
import Avatar from "@mui/material/Avatar";

type Props = {
    name: string;
    source: string;
};

/**
 * A user avatar with fallback to color based on the name.
 *
 * @param {string} name - The name of the user
 * @param {string} source - The source of the background image
 * @returns {React.FunctionComponent} A avatar
 */
const ColorAvatar: React.FC<Props> = ({ name, source }) => {
    return <Avatar alt={name} src={source} sx={{ bgcolor: stringToColor(name) }} />;
};

export default ColorAvatar;
