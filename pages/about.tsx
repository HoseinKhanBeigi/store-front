import type { ReactElement } from "react";
import { SecondaryLayout } from "../components/SecondaryLayout";
import type { NextPageWithLayout } from "./_app";

import { ArrowForward } from "../components/Asset";
import Image from "next/image";
import styles from "../styles/about.module.scss";
const About: NextPageWithLayout = (props) => {
    return (
        <>
            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa vitae non
                dolore nemo deserunt tempora libero quo, architecto sunt, at minima
                repellat necessitatibus.<div className={styles.b}>Aliquam</div>{" "}
                <div className={styles.b}>venenatis</div> ea rerum consequuntur autem magni
                reprehenderit accusantium.
            </div>
        </>
    );
};

{
    /* <div className={styles.child}>
      <div>
          <ArrowForward color="white" width="250" height="250" />
          <Image src={"/pic/icons1.png"} width="250" height="250" />
      </div>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus iste
      magni explicabo beatae, magnam qui sint repudiandae quidem rem aliquid
      amet molestias inventore. Praesentium sed debitis ducimus! Recusandae,
      accusamus nulla! Lorem, ipsum dolor sit amet consectetur adipisicing
      elit. Possimus iste magni explicabo beatae, magnam qui sint repudiandae
      quidem rem aliquid amet molestias inventore. Praesentium sed debitis
      ducimus! Recusandae, accusamus nulla! Lorem, ipsum dolor sit amet
      consectetur adipisicing elit. Possimus iste magni explicabo beatae,
      magnam qui sint repudiandae quidem rem aliquid amet molestias inventore.
      Praesentium sed debitis ducimus! Recusandae, accusamus nulla! Lorem,
      ipsum dolor sit amet consectetur adipisicing elit. Possimus iste magni
      explicabo beatae, magnam qui sint repudiandae quidem rem aliquid amet
      molestias inventore. Praesentium sed debitis ducimus! Recusandae,
      accusamus nulla! Lorem, ipsum dolor sit amet consectetur adipisicing
      elit. Possimus iste magni explicabo beatae, magnam qui sint repudiandae
      quidem rem aliquid amet molestias inventore. Praesentium sed debitis
      ducimus! Recusandae, accusamus nulla!
      </div> */
}

// About.getLayout = (page: ReactElement) => {
//     return (
//         <SecondaryLayout>
//             {page}
//         </SecondaryLayout>
//     )
// }

export default About;
