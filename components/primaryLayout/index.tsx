import React, { useEffect } from "react";
import SideBarTransition from "../sideBarTransition";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import { Header } from "../header";
import { Translate } from "@mui/icons-material";
interface MainProps {
    open?: boolean;
}
const Wrapper = styled(Box)<MainProps>(({ theme, open }) => ({
    ...(open && {
        "&::before": {
            top: 0,
            left: 0,
            content: '""',
            position: "fixed",
            display: "block",
            width: "100%",
            height: "100%",
            zIndex: 999,
            backgroundColor: "rgba(0,0,0,.75)",
        },
    }),
}));

const Nav = styled("nav")<MainProps>(({ theme, open }) => ({
    display: "flex",
    width: "320px",
    height: "100vh",
    background: "black",
    position: "fixed",
    overflowY: "auto",
    zIndex: 999,
    top: 0,
    transform: "translateX(-320px)",
    transition: theme.transitions.create(["transform"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        transform: "translateX(0px)",
        transition: theme.transitions.create(["transform"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Main = styled("main")<MainProps>(({ theme, open }) => ({
    // padding: theme.spacing(3),
    marginTop: "70px",
    zIndex: 999,
}));

interface PropsType {
    children: React.ReactNode;
    HeaderContent?: () => JSX.Element;
}

export const PrimaryLayout: React.FC<PropsType> = ({
    children,
    HeaderContent,
}) => {
    const [position, setPosition] = React.useState<boolean>(false);
    const openNavBar = () => {
        setPosition(true);
    };

    const closeNavBar = (e: any) => {
        if (e.target.getAttribute("data-name") === "wrapper") {
            setPosition(false);
        }
    };
    return (
        <Wrapper onClick={closeNavBar} open={position} data-name="wrapper">
            <Header openMenu={openNavBar} status={position} setPosition={setPosition}>
                {HeaderContent ? (<HeaderContent />) : ''}
            </Header>
            <Nav open={position}>
                <SideBarTransition />
            </Nav>
            <Main open={position} onClick={closeNavBar} data-name="wrapper">
                {children}
            </Main>
        </Wrapper>
    );
};
