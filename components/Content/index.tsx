import * as React from "react";
import type { ReactNode } from 'react'
import { styled } from "@mui/material/styles";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    marginTop: theme.spacing(6),
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: `${drawerWidth}px`,

    }),
}));

interface Props {
    open: boolean,
    children: ReactNode
}

const Content: React.FC<Props> = ({ children, open }) => {
    return <Main open={open}>{children}</Main>;
};

export default Content;
