import clsx from "clsx";
import { PrimaryLayout } from "../../components/primaryLayout";
import { getRandomInt } from "../../utils/utl"
import styles from "../../styles/menutogrid.module.scss";
import { Row } from '../../components/menutogrid/row';
import { GetStaticProps } from "next";
import path from 'path';
import { promises as fs } from "fs";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/dist/Flip';
gsap.registerPlugin(Flip);



interface Props {
    images: any
}
const MenuToGrid: React.FC<Props> = ({ images }) => {
    const contents: any = useRef([]);
    const [items, setItems]: any = useState([]);
    const titles = ["Nobody's Love", "Good Wings", "Maniac Fly", "Crumble Toe", "Finger Wax", "Haunted X", "Next Horror", "Nobody's Love", "Maniac Fly", "Crumble Toe", "Finger Wax", "Haunted X", "Next Horror", "Nobody's Love"]
    const computeContents = useCallback(() => {
        let grid: any = [];
        let count = 0;
        let rows = images.length / 5;
        for (let i = 0; i < rows; i++) {
            grid[i] = [];
            for (let j = 0; j < getRandomInt(3, 7); j++) {
                grid[i][j] = images[count];
                count++;
            }
        };
        const content = grid.map((el: any, n: number) => {
            return {
                name: titles[n],
                img: el
            }
        });
        setItems(content)
    }, []);




    const init = () => {
        const previs: any = document.querySelectorAll(`.${styles.preview} > .${styles.preview__item}`)
        const allRow: any = document.querySelectorAll(`.${styles.row}`)
        const previewItems = [...previs];
        const rows = [...allRow];
        const cover = document.querySelector(`.${styles.cover}`);
        const closeCtrl: any = document.querySelector(`.${styles.preview__close}`);
        const body = document.body;
        let rowsArr: any = [];
        rows.forEach((row, position) => {
            rowsArr.push(new Row(row, previewItems[position]));
        });
        let isOpen = false;
        let isAnimating = false;
        let currentRow = -1;
        let mouseenterTimeline: any;
        for (const row of rowsArr) {
            row.DOM.el.addEventListener('mouseenter', () => {
                if (isOpen) return;

                gsap.killTweensOf([row.DOM.images, row.DOM.title]);

                mouseenterTimeline = gsap.timeline()
                    .addLabel('start', 0)
                    .to(row.DOM.images, {
                        duration: 0.4,
                        ease: 'power3',
                        startAt: {
                            scale: 0.8,
                            xPercent: 20
                        },
                        scale: 1,
                        xPercent: 0,
                        opacity: 1,
                        stagger: -0.035
                    }, 'start')
                    .set(row.DOM.title, { transformOrigin: '0% 50%' }, 'start')
                    .to(row.DOM.title, {
                        duration: 0.1,
                        ease: 'power1.in',
                        yPercent: -100,
                        onComplete: () => row.DOM.titleWrap.classList.add(`${styles.cell__titleSwitch}`)
                    }, 'start')
                    .to(row.DOM.title, {
                        duration: 0.5,
                        ease: 'expo',
                        startAt: {
                            yPercent: 100,
                            rotation: 15
                        },
                        yPercent: 0,
                        rotation: 0
                    }, 'start+=0.1');
            });
            row.DOM.el.addEventListener('mouseleave', () => {
                if (isOpen) return;

                gsap.killTweensOf([row.DOM.images, row.DOM.title]);

                gsap.timeline()
                    .addLabel('start')
                    .to(row.DOM.images, {
                        duration: 0.4,
                        ease: 'power4',
                        opacity: 0,
                        scale: 0.8
                    }, 'start')
                    .to(row.DOM.title, {
                        duration: 0.1,
                        ease: 'power1.in',
                        yPercent: -100,
                        onComplete: () => row.DOM.titleWrap.classList.remove(`${styles.cell__titleSwitch}`)
                    }, 'start')
                    .to(row.DOM.title, {
                        duration: 0.5,
                        ease: 'expo',
                        startAt: {
                            yPercent: 100,
                            rotation: 15
                        },
                        yPercent: 0,
                        rotation: 0
                    }, 'start+=0.1');
            });
            // Open a row and reveal the grid
            row.DOM.el.addEventListener('click', () => {
                if (isAnimating) return;
                isAnimating = true;
                isOpen = true;
                currentRow = rowsArr.indexOf(row);
                gsap.killTweensOf([cover, rowsArr.map((row: any) => row.DOM.title)]);
                gsap.timeline({
                    onStart: () => {
                        body.classList.add('oh');
                        row.DOM.el.classList.add(`${styles.rowCurrent}`);
                        row.previewItem.DOM.el.classList.add(`${styles.preview__itemCurrent}`);

                        gsap.set(row.previewItem.DOM.images, { opacity: 0 });

                        // set cover to be on top of the row and then animate it to cover the whole page
                        gsap.set(cover, {
                            height: row.DOM.el.offsetHeight - 1, // minus border width
                            top: row.DOM.el.getBoundingClientRect()['top'],
                            opacity: 1
                        });

                        gsap.set(row.previewItem.DOM.title, {
                            yPercent: -100,
                            rotation: 15,
                            transformOrigin: '100% 50%'
                        });

                        closeCtrl.classList.add(`${styles.preview__closeShow}`);
                    },
                    onComplete: () => { isAnimating = false }
                })
                    .addLabel('start', 0)
                    .to(cover, {
                        duration: 0.9,
                        ease: 'power4.inOut',
                        height: window.innerHeight,
                        top: 0,
                    }, 'start')
                    // animate all the titles out
                    .to(rowsArr.map((row: any) => row.DOM.title), {
                        duration: 0.5,
                        ease: 'power4.inOut',
                        yPercent: (_, target) => {
                            return target.getBoundingClientRect()['top'] > row.DOM.el.getBoundingClientRect()['top'] ? 100 : -100;
                        },
                        rotation: 0
                    }, 'start')
                    .add(() => {
                        mouseenterTimeline.progress(1, false);
                        const flipstate = Flip.getState(row.DOM.images, { simple: true });
                        row.previewItem.DOM.grid.prepend(...row.DOM.images);
                        Flip.from(flipstate, {
                            duration: 0.9,
                            ease: 'power4.inOut',
                            //absoluteOnLeave: true,
                            stagger: 0.04,
                        })
                            // other images in the grid
                            .to(row.previewItem.DOM.images, {
                                duration: 0.9,
                                ease: 'power4.inOut',
                                startAt: { scale: 0, yPercent: () => gsap.utils.random(0, 200) },
                                scale: 1,
                                opacity: 1,
                                yPercent: 0,
                                stagger: 0.04
                            }, 0.04 * (row.DOM.images.length))
                    }, 'start')
                    .to(row.previewItem.DOM.title, {
                        duration: 1,
                        ease: 'power4.inOut',
                        yPercent: 0,
                        rotation: 0,
                        onComplete: () => row.DOM.titleWrap.classList.remove(`${styles.cell__titleSwitch}`)
                    }, 'start')
                    .to(closeCtrl, {
                        duration: 1,
                        ease: 'power4.inOut',
                        opacity: 1
                    }, 'start');

            });
        };
        // Close the grid and show back the rows
        closeCtrl.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;
            isOpen = false;
            if (items.length > 0) {
                const row = rowsArr[currentRow];
                gsap.timeline({
                    defaults: { duration: 0.5, ease: 'power4.inOut' },
                    onStart: () => body.classList.remove('oh'),
                    onComplete: () => {
                        row.DOM.el.classList.remove(`${styles.rowCurrent}`);
                        row.previewItem.DOM.el.classList.remove(`${styles.preview__itemCurrent}`);
                        isAnimating = false;
                    }
                })
                    .addLabel('start', 0)
                    .to([row.DOM.images, row.previewItem.DOM.images], {
                        scale: 0,
                        opacity: 0,
                        stagger: 0.04,
                        onComplete: () => row.DOM.imagesWrap.prepend(...row.DOM.images)
                    }, 0)
                    .to(row.previewItem.DOM.title, {
                        duration: 0.6,
                        yPercent: 100
                    }, 'start')
                    .to(closeCtrl, {
                        opacity: 0
                    }, 'start')
                    // animate cover out
                    .to(cover, {
                        ease: 'power4',
                        height: 0,//,row.DOM.el.offsetHeight-1, // minus border width
                        top: row.DOM.el.getBoundingClientRect()['top'] + row.DOM.el.offsetHeight / 2
                    }, 'start+=0.4')
                    // fade out cover
                    .to(cover, {
                        duration: 0.3,
                        opacity: 0
                    }, 'start+=0.9')
                    // animate all the titles in
                    .to(rowsArr.map((row: any) => row.DOM.title), {
                        yPercent: 0,
                        stagger: {
                            each: 0.03,
                            grid: 'auto',
                            from: currentRow
                        }
                    }, 'start+=0.4')
            }

        });

    };
    useEffect(() => {
        computeContents();
    }, []);

    useEffect(() => {
        if (items) {
            init()
        }
    }, [items])
    return (
        <PrimaryLayout>
            <section className={clsx(styles.content)}>
                <div className={clsx(styles.cover)}></div>
                {items.map((e: any, i: number) => {
                    return (
                        <div className={clsx(styles.row, 'row')} key={i}>
                            <div className={clsx(styles.cell, styles.cellText)}>
                                <h2 className={clsx(styles.cell__title, styles.oh)}>
                                    <span className={clsx(styles.oh__inner)}>{e.name}</span>
                                </h2>
                            </div>
                            <div className={clsx(styles.cell, styles.cellImages)}>
                                {e.img.map((image: any, n: number) => {
                                    return (
                                        <div className={clsx(styles.cell__img)} key={n}>
                                            <div className={clsx(styles.cell__imgInner)} style={{ backgroundImage: `url(/img/${image})` }}></div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </section>
            <section className={clsx(styles.preview)}>
                <button className={clsx(styles.preview__close, styles.unbutton)}>&#9587;</button>
                {items.map((e: any, i: number) => {
                    return (
                        <div className={clsx(styles.preview__item)} key={i}>
                            <h2 className={clsx(styles.preview__itemTitle, styles.oh)}>
                                <span className={clsx(styles.oh__inner)}>Nobody's Love</span>
                            </h2>
                            <div className={clsx(styles.grid)}>
                                {e.img.map((image: any, n: number) => {
                                    return (
                                        <div className={clsx(styles.cell__img)} key={n}>
                                            <div className={clsx(styles.cell__imgInner)} style={{ backgroundImage: `url(/img/${image})` }}></div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}

            </section>
        </PrimaryLayout>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const jsonDirectory = path.join('public/img');
    const images = await fs.readdir(jsonDirectory);
    return { props: { images } };
};


export default MenuToGrid;