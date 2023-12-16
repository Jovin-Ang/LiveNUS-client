import * as React from "react";
import { Box, Fab, Fade, useScrollTrigger } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollTop() {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
            "#back-to-top-anchor",
        );

        if (anchor) {
            anchor.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: "fixed", bottom: { xs: 66, lg: 16 }, right: 16 }}
            >
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </Box>
        </Fade>
    );
}
