import * as React from "react";
import Box from "@mui/material/Box";
import SideBar from "../SideBar";
import SideBarTransition from "../SideBarTransition"
import styles from "../../styles/Navigation.module.scss";
import { Header } from "../Header";
import Content from "../Content";
import style from "../../styles/primaryLayout.module.scss"
export const PrimaryLayout = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = React.useCallback(() => setOpen(true), [open]);
    const handleDrawerClose = React.useCallback(() => setOpen(false), [open]);
    return (
        <div className={style.root}>

            <SideBarTransition />

            <Content open={open}>{children}</Content>
        </div>
    );
};
