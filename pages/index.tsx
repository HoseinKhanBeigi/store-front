import { useEffect } from "react";
import type { ReactElement } from "react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { fetchUsers, getServerItems } from "../store/slices/userSlice";
import { PrimaryLayout } from "../components/PrimaryLayout";
import { NextPageContext } from "next";
import { wrapper, AppDispatch, RootState } from "../store/store";
import type { NextPageWithLayout } from "./_app";
import { useAppSelector } from "../hooks";

const Home: NextPageWithLayout = (props) => {
  const { entities, loading, error } = useAppSelector((state) => state.user);

  return (
    <p>
      {" "}
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    </p>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await store.dispatch(fetchUsers());

  return {
    props: {
      data: "",
    },
  };
});

export default Home;
