import React, { useEffect } from "react";
import styled from "styled-components";
import { Menu } from "../menu"

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  height: 70px;
  line-height: 73px;
  font-size: 13px;
  font-weight: 400;
  background-color: #f4f7f6;
  z-index: 9;
  transition: background 0.3s;
`;

const MainHeader = styled.div`
  display: flex;
  height: 70px;
  border-bottom: 1px solid #e6eaea;
`;

const BoxLeft = styled.div`

`;

const BoxRight = styled.div`
    display: flex;
    justify-content: flex-end;
    flex: 1;
`;

export const Header = () => {
  return (
    <Wrapper>
      <MainHeader>
        <BoxLeft>
          <Menu />
        </BoxLeft>
        <BoxRight />
      </MainHeader>
    </Wrapper>
  )
};
