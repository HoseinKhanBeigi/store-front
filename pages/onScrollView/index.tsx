import clsx from "clsx";
import { PrimaryLayout } from "../../components/primaryLayout";
import styles from "../../styles/onScrollView.module.scss";
import { GetStaticProps } from "next";
import path from 'path';
import { promises as fs } from "fs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface Props {
    images: any
}

const OnScrollView: React.FC<Props> = ({ images }) => {
    const [figure, setFigure] = useState([]);
    const titles = useMemo(() => {
        return ["Cast a spell", "Corruption", "All their lives", "You'll burn in hell", "What we become", "Take a bow", "You bring death", "You must pay", "Feed the hex", "Beg for their lives", "For all your sins", "Beholden"]
    }, []);
    const computeFigure = useCallback(() => {
        const result = images.map((e: any, i: number) => {
            return {
                title: titles[i],
                img: e
            }
        });
        setFigure(result)
    }, [figure]);

    useEffect(() => {
        computeFigure();
    }, []);

    return (
        <PrimaryLayout>
            <div className={clsx(styles.heading)}>
                <h2 className={clsx(styles.heading__main)}>{"Projects * Insomnia * Projects * Insomnia * Projects * Insomnia * Projects"}</h2>
                <span className={clsx(styles.heading__sub)}>{"1984 - 2022"}</span>
            </div>
            <div className={clsx(styles.switch)}>
                <button className={clsx(styles.unbutton, styles.switch__button, styles.switch__buttongrid)}>
                    <svg width="18px" height="18px" viewBox="0 0 45 45">
                        <rect x="0" y="0" width="20" height="20"></rect>
                        <rect x="25" y="0" width="20" height="20"></rect>
                        <rect x="0" y="25" width="20" height="20"></rect>
                        <rect x="25" y="25" width="20" height="20"></rect>
                    </svg>
                </button>
                <button className={clsx(styles.unbutton, styles.switch__button, styles.switch__buttonlist, styles.switch__buttoncurrent)}>
                    <svg width="18px" height="18px" viewBox="0 0 43 43">
                        <rect x="0" y="0" width="11" height="11"></rect>
                        <rect x="16" y="0" width="25" height="11"></rect>
                        <rect x="16" y="16" width="25" height="11"></rect>
                        <rect x="16" y="32" width="25" height="11"></rect>
                        <rect x="0" y="16" width="11" height="11"></rect>
                        <rect x="0" y="32" width="11" height="11"></rect>
                    </svg>
                </button>
            </div>
            <div className={clsx(styles.content)}>
                {figure.map((e: any, i: number) => {
                    return (
                        <figure className={clsx(styles.item)} key={i}>
                            <figcaption className={clsx(styles.item__caption)}>
                                <span className={clsx(styles.item__captionnumber, styles.oh)}><span className={clsx(styles.oh__inner)}>{(i + 1) > 9 ? (i + 1) : `0${(i + 1)}`}</span></span>
                                <h2 className={clsx(styles.item__captiontitle, styles.oh)}><span className={clsx(styles.oh__inner)}>{e.title}</span></h2>
                                <p className={clsx(styles.item__captiondescription)}>
                                    {"All natural and technological processes"}
                                    {"Proceed in such a way that the availability"}
                                    {"Of the remaining energy decreases"}
                                </p>
                            </figcaption>
                            <div className={clsx(styles.item__imagewrap)}>
                                <div className={clsx(styles.item__image)}>
                                    <div className={clsx(styles.item__imageinner)} style={{ backgroundImage: `url(/img/${e.img})` }}></div>
                                </div>
                            </div>
                        </figure>
                    )
                })}
            </div>
            <div className={clsx(styles.grid)} />
        </PrimaryLayout>
    )
};

export default OnScrollView;

export const getStaticProps: GetStaticProps = async (context) => {
    const jsonDirectory = path.join('public/imgscroll');
    const images = await fs.readdir(jsonDirectory);
    return { props: { images } };
};


