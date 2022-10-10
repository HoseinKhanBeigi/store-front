import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import Box from '@mui/material/Box';
import { PrimaryLayout } from "../components/primaryLayout";
import { styled, useTheme } from '@mui/material/styles';
import { GetStaticProps } from "next";


const Home = () => {
  const root = useRef();
  return (
    <PrimaryLayout>
      <div>content</div>
    </PrimaryLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return { props: { launches: "" } };
};

export default Home;
