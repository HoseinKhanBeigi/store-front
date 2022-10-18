import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import Box from '@mui/material/Box';
import { PrimaryLayout } from "../components/primaryLayout";
import { styled, useTheme } from '@mui/material/styles';
import styles from "../styles/me.module.scss";
import { GetStaticProps } from "next";
import clsx from "clsx";


const Home = () => {
  const root = useRef();
  return (
    <PrimaryLayout>
      <div className={clsx(styles.sections)}>
        <section className={clsx(styles.section, styles.sectioncurrent)}>
          <div className={clsx(styles.section__content)}>
            <h2 className={clsx(styles.section__title)}>Front-end dev</h2>
            <p className={clsx(styles.section__description)}><span className={clsx(styles.section__descriptioninner)}>{"I am a self-studied software developer. My experience spans a wide range of software development areas including web-based enterprise applications, server-side development, and modern Frontend technologies."}</span></p>
          </div>

          <div className={clsx(styles.section__more)}>
          </div>
          <div className={clsx(styles.section__expander)}></div>
          <ul className={clsx(styles.section__facts)}>
            <li className={clsx(styles.section__factsitem)}>
              <h3 className={clsx(styles.section__factstitle)}>{'linkdin'}</h3>
              <span className={clsx(styles.section__factsdetail)}>{'https://www.linkedin.com/in/hosein-khan-beigi/'}</span>
            </li>
            <li className={clsx(styles.section__factsitem)}>
              <h3 className={clsx(styles.section__factstitle)}>{'github'}</h3>
              <span className={clsx(styles.section__factsdetail)}>{'https://github.com/HoseinKhanBeigi'}</span>
            </li>
            <li className={clsx(styles.section__factsitem)}>
              <h3 className={clsx(styles.section__factstitle)}>{"gmail"}</h3>
              <span className={clsx(styles.section__factsdetail)}>{'hoseinkhanbeigi@gmail.com'}</span>
            </li>
            <li className={clsx(styles.section__factsitem, styles.section__factsitemclickable)} data-gallery="gallery1">
              <h3 className={clsx(styles.section__factstitle)}>{'phone number'}</h3>
              <span className={clsx(styles.section__factsdetail)}>{'+989123979838'}</span>
            </li>
          </ul>

        </section>
      </div>
    </PrimaryLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return { props: { launches: "" } };
};

export default Home;
