import React, { useEffect } from "react";
import SideBarTransition from "../sideBarTransition";
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import { Header } from "../header"
interface MainProps {
    open?: boolean;
}
const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
}));

const Nav = styled('nav')<MainProps>(({ theme, open }) => ({
    display: 'flex',
    width: '320px',
    height: '100vh',
    background: 'black',
    overflowY: 'auto',
    marginLeft: '-320px',
    transition: theme.transitions.create(["margin-left", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: `${0}px`,
        transition: theme.transitions.create(["margin-left", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));



const Main = styled('main')<MainProps>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: '70px',
}));

interface PropsType {
    children: React.ReactNode;
}

export const PrimaryLayout: React.FC<PropsType> = ({ children }) => {
    const wrapper: React.MutableRefObject<HTMLDivElement | any> = React.useRef();


    const [position, setPosition] = React.useState<boolean>(false)
    const openNavBar = () => {
        setPosition(true);
    };

    const closeNavBar = (e: any) => {
        if (e.target.getAttribute("data-name") === "wrapper") {
            setPosition(false);
        }
    };
    return (
        <Wrapper onClick={closeNavBar}>
            <Header openMenu={openNavBar} status={position} setPosition={setPosition} />
            <Nav open={position}>
                <SideBarTransition />
            </Nav>
            <Main open={position} onClick={closeNavBar} data-name="wrapper">
                {children}
            </Main>
        </Wrapper>

    );
};
