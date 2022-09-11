import React, { useEffect } from "react";
import SideBarTransition from "../sideBarTransition";
import styled from "styled-components";

interface WrapperProps {
    pos: string;
}
const Wrapper = styled.div<WrapperProps>`
  position: ${(props: any) => props.pos};
  width: 100%;
  min-height: 100%;
  background: #f4f7f6;
  z-index: 1;
  transform: ${(props: any) => props.pos === "fixed" && 'translateX(320px)'};
  transition: transform 0.5s ease-in-out;
  &:before {
    content:"";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 10;
    opacity: ${(props: any) => props.pos === "fixed" ? '1' : '0'};;
    visibility: ${(props: any) => props.pos === "fixed" ? 'visible' : 'hidden'};
    transition: all 0.5s ease-in-out;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  z-index: 0;
  top: 0;
  bottom: 0;
  left: 0;
  width: 320px;
  height: 100vh;
  background: black;
  overflow-y: auto;
  transform: translateX(-320px);
  transition: background 0.3s ease-in-out;
`;

interface PropsType {
    children: React.ReactNode,
}
export const PrimaryLayout: React.FC<PropsType> = ({ children }) => {
    const wrapper: React.MutableRefObject<HTMLDivElement | any> = React.useRef();


    const [position, setPosition] = React.useState<string>("relative")
    const openNavBar = () => {
        setPosition("fixed");
    };




    const closeNavBar = (e: any) => {
        if (e.target.getAttribute("data-name") === "wrapper") {
            setPosition("relative");
        }
    };
    return (
        <Wrapper onClick={closeNavBar} className="wrapper" data-name="wrapper" pos={position} ref={wrapper}>
            <Nav className="navi" />
            {children}
        </Wrapper>
    );
};
