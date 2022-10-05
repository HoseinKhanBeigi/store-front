import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import Box from '@mui/material/Box';
import { PrimaryLayout } from "../components/primaryLayout";
import { styled, useTheme } from '@mui/material/styles';
import type { NextPageWithLayout } from "./_app";
import { GetStaticProps } from "next";


const Home: NextPageWithLayout = () => {
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
