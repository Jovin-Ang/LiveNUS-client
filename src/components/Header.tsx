import * as React from "react";
import Typography from "@mui/material/Typography";

type Props = {
    title: string;
};

const Header: React.FC<Props> = ({ title }) => {
    return (
        <Typography variant="h6" gutterBottom sx={{ py: 2.5 }}>
            {title}
        </Typography>
    );
};

export default Header;
