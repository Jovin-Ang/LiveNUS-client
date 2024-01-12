import * as React from "react";
import Chip from "@mui/material/Chip";

/**
 * Converts a string to a HEX color code.
 *
 * @param {string} string - The string to convert
 * @returns {string} The HEX color code
 */
export function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

type Props = {
    id: string;
    name: string;
};

/**
 * A clickable chip with category name.
 *
 * @param {string} id - ID of the category
 * @param {string} name - Name of the category
 * @returns {React.FunctionComponent} The category chip
 */
const CategoryChip: React.FC<Props> = ({ id, name }) => {
    return (
        <Chip
            label={name}
            component="a"
            href={"/categories/" + id}
            clickable
            sx={{ color: "#fff", bgcolor: stringToColor(name) }}
        />
    );
};

export default CategoryChip;
