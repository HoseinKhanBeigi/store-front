import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import { PrimaryLayout } from "../components/primaryLayout";
import type { NextPageWithLayout } from "./_app";
import { GetStaticProps } from "next";

const Home: NextPageWithLayout = () => {
  const root = useRef();

  const handleClick = () => {

  }


  return (
    <PrimaryLayout>
      home
      {/* <button onClick={handleClick}>Menu</button> */}
    </PrimaryLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return { props: { launches: "" } };
};

export default Home;
