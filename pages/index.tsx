import { useEffect } from "react";
import type { ReactElement } from "react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import { fetchTestPhotos } from "../store/actions/photos";
import { PrimaryLayout } from "../components/PrimaryLayout";
import { NextPageContext } from "next";
import { wrapper, AppDispatch, RootState } from "../store/store";
import type { NextPageWithLayout } from "./_app";
import { useAppSelector } from "../hooks";

const Home: NextPageWithLayout = () => {
  const { entities, status, error } = useAppSelector((state) => state.photo);

  console.log(status, entities, "status");

  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </p>
      {entities.map((el: any) => {
        return <img src={el.urls.regular} width={400} height="100%" />;
      })}
    </div>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await store.dispatch(fetchTestPhotos(1));
  return {
    props: {
      data: "",
    },
  };
});

export default Home;
