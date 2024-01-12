import Page from "../types/Page";
import * as React from "react";
import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type Props = {
    newPostPage: Page;
};

/**
 * A floating action button that links to the new post page.
 *
 * @param {Page} newPostPage - Page object for creating a new post
 * @returns {React.FunctionComponent} A floating action button
 */
const NewPostBtn: React.FC<Props> = ({ newPostPage }) => {
    return (
        <Box
            role="presentation"
            sx={{
                position: "fixed",
                top: { xs: "auto", lg: 14 },
                bottom: { xs: 16, lg: "auto" },
                right: 16,
                zIndex: 1150,
            }}
        >
            <Fab size="small" aria-label="new post btn" component="a" href={newPostPage.route}>
                <AddIcon />
            </Fab>
        </Box>
    );
};

export default NewPostBtn;
