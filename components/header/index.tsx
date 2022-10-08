import React, { useEffect } from "react";

import { Menu } from "../menu";
import { styled } from "@mui/material/styles";

interface AppBarProps {
  open?: boolean;
}

const Wrapper = styled("div")<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin-left", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${320}px)`,
    marginLeft: `${320}px`,
    transition: theme.transitions.create(["margin-left", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  position: "fixed",
  top: 0,
  width: "100%",
  height: "70px",
  fontSize: "13px",
  fontWeight: 400,
  backgroundColor: "#f4f7f6",
  zIndex: 9,
}));

const MainHeader = styled("div")(({ theme }) => ({
  display: "flex",
  height: "70px",
  borderBottom: "1px solid #e6eaea",
}));


const BoxRight = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  flex: 1,
}));

interface Props {
  openMenu: () => void;
  setPosition: (e: any) => void;
  status: boolean;
  children?: React.ReactNode
}

export const Header: React.FC<Props> = ({ openMenu, setPosition, status, children }) => {
  return (
    <Wrapper open={status}>
      <MainHeader>
        <Menu openMenu={openMenu} setPosition={setPosition} status={status} />
        <BoxRight>
          {children}
        </BoxRight>
      </MainHeader>
    </Wrapper>
  );
};
