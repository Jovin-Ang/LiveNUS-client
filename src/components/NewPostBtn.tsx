import Page from "../types/Page";
import * as React from "react";
import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type Props = {
    newPostPage: Page;
};
const NewPostBtn: React.FC<Props> = ({ newPostPage }) => {
    return (
        <Box
            role="presentation"
            sx={{ position: "fixed", top: { xs: "auto", lg: 14 }, bottom: { xs: 16, lg: "auto" }, right: 16 }}
        >
            <Fab size="small" aria-label="scroll back to top" component="a" href={newPostPage.route}>
                <AddIcon />
            </Fab>
        </Box>
    );
};

export default NewPostBtn;
