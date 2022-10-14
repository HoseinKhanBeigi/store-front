import clsx from "clsx";
import { isInViewport } from "../../utils/utl";
import { PrimaryLayout } from "../../components/primaryLayout";
import styles from "../../styles/onScrollView.module.scss";
import { GetStaticProps } from "next";
import path from "path";
import { promises as fs } from "fs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Item } from "../../components/scrollview/item";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Flip } from "gsap/dist/Flip";
import Lenis from "@studio-freight/lenis";
gsap.registerPlugin(ScrollTrigger, Flip);

interface Props {
    images: any;
}

const OnScrollView: React.FC<Props> = ({ images }) => {
    const [figure, setFigure] = useState([]);
    const titles = useMemo(() => {
        return [
            "Cast a spell",
            "Corruption",
            "All their lives",
            "You'll burn in hell",
            "What we become",
            "Take a bow",
            "You bring death",
            "You must pay",
            "Feed the hex",
            "Beg for their lives",
            "For all your sins",
            "Beholden",
        ];
    }, []);
    const computeFigure = useCallback(() => {
        const result = images.map((e: any, i: number) => {
            return {
                title: titles[i],
                img: e,
            };
        });
        setFigure(result);
    }, []);

    const init = () => {
        // Item instances (Item is the .content > figure.item)

        const items: any = [];
        let lenis: any;
        const allItems: any = document.querySelectorAll(`.${styles.item}`);
        [...allItems].forEach((item) => {
            items.push(new Item(item));
        });

        // Toggle grid view
        const switchCtrl: any = {
            grid: document.querySelector('.switch__button--grid'),
            list: document.querySelector('.switch__button--list'),
        };

        // Text element that moves horizontally as we scroll
        const heading: any = {
            el: document.querySelector(`.${styles.heading}`),
            main: document.querySelector(`.${styles.heading} .${styles.heading__main}`),
        };

        // Placeholder for the grid items (.item__image). We'll use the gsap FLIP plugin to move the "".item .item__image" inside the grid element
        const grid: any = document.querySelector(`.${styles.grid}`);
        // Initialize Lenis smooth scrolling
        const initSmoothScrolling = () => {
            if (figure.length > 0) {
                lenis = new Lenis({ duration: 0.1, smooth: true });
                const scrollFn = (time: any) => {
                    lenis.raf(time);
                    requestAnimationFrame(scrollFn);
                };
                requestAnimationFrame(scrollFn);
            }
        };
        // ScrollTrigger animations for scrolling
        const animateOnScroll = () => {
            if (figure.length > 0) {
                for (const item of items) {
                    gsap.set(item.DOM.imageInner, { transformOrigin: "50% 0%" });

                    gsap
                        .timeline({
                            scrollTrigger: {
                                trigger: item.DOM.el,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true,
                            },
                        })
                        .addLabel("start", 0)
                        // scale up the inner image
                        .to(
                            item.DOM.imageInner,
                            {
                                ease: "none",
                                scaleY: 2.4,
                                scaleX: 1.2,
                                opacity: 0,
                            },
                            "start"
                        )
                        // translate the title and number
                        .to(
                            [item.DOM.title, item.DOM.number],
                            {
                                ease: "none",
                                yPercent: -150,
                            },
                            "start"
                        )
                        // translate the inner title/number (overflow is hidden so they get hidden)
                        .to(
                            [item.DOM.titleInner, item.DOM.numberInner],
                            {
                                scrollTrigger: {
                                    trigger: item.DOM.el,
                                    start: "top bottom",
                                    end: "top 20%",
                                    scrub: true,
                                },
                                ease: "expo.in",
                                yPercent: -100,
                            },
                            "start"
                        );
                    /*
                            .to(item.DOM.description, {
                                scrollTrigger: {
                                    trigger: item.DOM.el,
                                    start: 'top bottom',
                                    end: 'bottom top',
                                    scrub: true,
                                },
                                ease: 'none',
                                yPercent: 100
                            }, 'start')
                            */
                }

                // animate the heading element as we scroll (horizontally)
                let windowWidth = window.innerWidth;
                gsap.to(heading.main, {
                    scrollTrigger: {
                        start: 0,
                        end: "max",
                        scrub: true,
                    },
                    ease: "none",
                    x: () =>
                        -heading.main.offsetWidth -
                        ((13.25 * windowWidth) / 100 +
                            (25 * windowWidth) / 100 +
                            windowWidth / 100) +
                        windowWidth,
                });
            }
        };
        const showGrid = () => {
            if (figure.length > 0) {
                document.body.classList.add(`${styles.gridopen}`);

                // stop the smooth scrolling
                lenis.stop();
                // get the DOM elements that we'll work with
                const DOM: any = getDOMElements();

                // Disable active ScrollTrigger instances
                let Alltrigger = ScrollTrigger.getAll();
                for (let i = 0; i < Alltrigger.length; i++) {
                    Alltrigger[i].disable(false);
                }

                // Use gsap flip for the animation
                // save the current state of the images
                const flipstate: any = Flip.getState(DOM.allImages);
                // put them inside the .grid element
                grid.append(...DOM.allImages);

                // gsap stagger properties
                const staggerConfig: any = {
                    grid: "auto",
                    // the order goes from the first item inside the viewport
                    from: DOM.inViewportItems.length
                        ? items.indexOf(DOM.inViewportItems[0])
                        : 0,
                    amount: 0.06,
                };
                // Flip it
                Flip.from(flipstate, {
                    duration: 0.7,
                    ease: "power3.inOut",
                    scale: true,
                    stagger: staggerConfig,
                }).to(
                    DOM.inViewportImagesInner,
                    {
                        duration: 0.7,
                        ease: "power3.inOut",
                        scaleX: 1,
                        scaleY: 1,
                        opacity: 1,
                        stagger: staggerConfig,
                    },
                    0
                )

                    // For the items outside of the viewport, simply reset the scales with no animation
                    .set(
                        DOM.outViewportImagesInner,
                        {
                            scaleX: 1,
                            scaleY: 1,
                            opacity: 1,
                        },
                        0
                    )
                    // hide the titles and numbers inner elments by translating them up
                    .to(
                        [DOM.inViewportTitlesInner, DOM.inViewportNumbersInner],
                        {
                            duration: 0.4,
                            ease: "power3.inOut",
                            yPercent: -100,
                            opacity: 0,
                        },
                        0
                    )
                    // hide description
                    .to(
                        DOM.inViewportDescription,
                        {
                            duration: 0.4,
                            ease: "power3.inOut",
                            opacity: 0,
                        },
                        0
                    )
                    // For all the items outside the viewport, simply set opacity to 0
                    .set(
                        [
                            DOM.outViewportTitlesInner,
                            DOM.outViewportNumbersInner,
                            DOM.outViewportDescription,
                        ],
                        {
                            opacity: 0,
                        },
                        0
                    )
                    // hide the heading element
                    .to(
                        heading.el,
                        {
                            duration: 0.7,
                            ease: "power3.inOut",
                            yPercent: -100,
                            x: -100,
                        },
                        0
                    );
            }
        };


        const hideGrid = () => {
            if (figure.length > 0) {

                document.body.classList.remove(`${styles.gridopen}`);

                // restart the smooth scrolling
                lenis.start();

                // get the DOM elements that we'll work with
                const DOM = getDOMElements();

                const flipstate = Flip.getState([DOM.allImages, DOM.allImagesInner], { props: 'opacity' });

                DOM.allImages.forEach((image: any, pos: number) => {
                    items[pos].DOM.imageWrap.appendChild(image)
                });

                // Enable ScrollTrigger instances
                let Alltrigger = ScrollTrigger.getAll();
                for (let i = 0; i < Alltrigger.length; i++) {
                    Alltrigger[i].enable(false);
                }

                Flip.from(flipstate, {
                    duration: 0.7,
                    ease: 'power3.inOut',
                    scale: true,
                })
                    .to([DOM.inViewportTitlesInner, DOM.inViewportNumbersInner, DOM.inViewportDescription], {
                        duration: 0.4,
                        ease: 'power3.inOut',
                        startAt: { opacity: 0 },
                        opacity: 1
                    }, 0)
                    .set([DOM.outViewportTitlesInner, DOM.outViewportNumbersInner, DOM.outViewportDescription], {
                        opacity: 1
                    }, 0)
                    .to(heading.el, {
                        duration: 0.7,
                        ease: 'power3.inOut',
                        yPercent: 0,
                        x: 0
                    }, 0);
            }

        }

        const getDOMElements = () => {
            const inViewportItems = items.filter((item: any) =>
                isInViewport(item.DOM.el)
            );
            const outViewportItems = items.filter(
                (n: any) => !inViewportItems.includes(n)
            );

            return {
                allImages: items.map((item: any) => item.DOM.image),
                allImagesInner: items.map((item: any) => item.DOM.imageInner),
                inViewportItems: inViewportItems,
                outViewportItems: outViewportItems,
                inViewportImagesInner: inViewportItems.map(
                    (item: any) => item.DOM.imageInner
                ),
                outViewportImagesInner: outViewportItems.map(
                    (item: any) => item.DOM.imageInner
                ),
                inViewportDescription: inViewportItems.map(
                    (item: any) => item.DOM.description
                ),
                outViewportDescription: outViewportItems.map(
                    (item: any) => item.DOM.description
                ),
                inViewportTitlesInner: inViewportItems.map(
                    (item: any) => item.DOM.titleInner
                ),
                outViewportTitlesInner: outViewportItems.map(
                    (item: any) => item.DOM.titleInner
                ),
                inViewportNumbersInner: inViewportItems.map(
                    (item: any) => item.DOM.numberInner
                ),
                outViewportNumbersInner: outViewportItems.map(
                    (item: any) => item.DOM.numberInner
                ),
            };
        };
        // Initialize the events
        const initEvents = () => {
            // show grid ctrl click
            if (figure.length > 0) {
                switchCtrl.grid.addEventListener('click', () => {
                    switchCtrl.grid.classList.add(`switch__button--hidden`, `${styles.switch__buttoncurrent}`);
                    switchCtrl.list.classList.remove(`switch__button--hidden`, `${styles.switch__buttoncurrent}`);
                    showGrid();
                });
                // hide grid ctrl click
                switchCtrl.list.addEventListener('click', () => {
                    switchCtrl.list.classList.add(`switch__button--hidden`, `${styles.switch__buttoncurrent}`);
                    switchCtrl.grid.classList.remove(`switch__button--hidden`, `${styles.switch__buttoncurrent}`);
                    hideGrid();
                });
            }
        };
        initSmoothScrolling();
        animateOnScroll();
        initEvents();

    };

    useEffect(() => {
        computeFigure();
    }, []);

    useEffect(() => {
        if (figure) {
            init();
        }
    }, [figure]);

    return (
        <PrimaryLayout>
            <div className={clsx(styles.wrapper)}>
                <div className={clsx(styles.heading)}>
                    <h2 className={clsx(styles.heading__main)}>
                        {
                            "Projects * Insomnia * Projects * Insomnia * Projects * Insomnia * Projects"
                        }
                    </h2>
                    <span className={clsx(styles.heading__sub)}>{"1984 - 2022"}</span>
                </div>
                <div className={clsx(styles.switch)}>
                    <button
                        className={clsx(
                            styles.unbutton,
                            styles.switch__button,
                            "switch__button--grid"
                        )}
                    >
                        <svg width="18px" height="18px" viewBox="0 0 45 45">
                            <rect x="0" y="0" width="20" height="20"></rect>
                            <rect x="25" y="0" width="20" height="20"></rect>
                            <rect x="0" y="25" width="20" height="20"></rect>
                            <rect x="25" y="25" width="20" height="20"></rect>
                        </svg>
                    </button>
                    <button
                        className={clsx(
                            styles.unbutton,
                            styles.switch__button,
                            styles.switch__buttoncurrent,
                            "switch__button--list"
                        )}
                    >
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
                                    <span className={clsx(styles.item__captionnumber, styles.oh)}>
                                        <span className={clsx(styles.oh__inner)}>
                                            {i + 1 > 9 ? i + 1 : `0${i + 1}`}
                                        </span>
                                    </span>
                                    <h2 className={clsx(styles.item__captiontitle, styles.oh)}>
                                        <span className={clsx(styles.oh__inner)}>{e.title}</span>
                                    </h2>
                                    <p className={clsx(styles.item__captiondescription)}>
                                        {"All natural and technological processes"}
                                        {"Proceed in such a way that the availability"}
                                        {"Of the remaining energy decreases"}
                                    </p>
                                </figcaption>
                                <div className={clsx(styles.item__imagewrap)}>
                                    <div className={clsx(styles.item__image)}>
                                        <div
                                            className={clsx(styles.item__imageinner)}
                                            style={{ backgroundImage: `url(/img/${e.img})` }}
                                        ></div>
                                    </div>
                                </div>
                            </figure>
                        );
                    })}
                </div>
                <div className={clsx(styles.grid)} />
            </div>
        </PrimaryLayout>
    );
};

export default OnScrollView;

export const getStaticProps: GetStaticProps = async (context) => {
    const jsonDirectory = path.join("public/imgscroll");
    const images = await fs.readdir(jsonDirectory);
    return { props: { images } };
};
