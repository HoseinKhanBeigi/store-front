import * as React from "react";
import Box from "@mui/material/Box";
import SideBar from "../SideBar";
import styles from "../../styles/Navigation.module.scss";
import { Header } from "../Header";
import Content from "../Content";
export const PrimaryLayout = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = React.useCallback(() => setOpen(true), [open]);
    const handleDrawerClose = React.useCallback(() => setOpen(false), [open]);
    return (
        <>
            <Box className={styles.box}>
                <Header open={open} handleDrawerOpen={handleDrawerOpen} />
                <SideBar open={open} handleDrawerClose={handleDrawerClose} />
            </Box>
            <Content open={open}>{children}</Content>
        </>
    );
};
