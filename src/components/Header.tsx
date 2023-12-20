import * as React from "react";
import { Typography, Divider } from "@mui/material";

type Props = {
    title: string;
};

const Header: React.FC<Props> = ({ title }) => {
    return (
        <>
            <Typography variant="h6" gutterBottom sx={{ py: 2.5 }}>
                {title}
            </Typography>
            <Divider sx={{ mb: 3 }} />
        </>
    );
};

export default Header;
