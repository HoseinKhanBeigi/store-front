import React, { useEffect } from 'react';
import { PrimaryLayout } from "../../components/primaryLayout";
import { gsap } from "gsap";
import { Observer } from "gsap/dist/Observer";
import { clsx } from 'clsx';
import { Slide } from '../../components/slide'
import { CursorText } from '../../components/cursor';
import styles from "../../styles/observer.module.scss";

gsap.registerPlugin(Observer);
const ObserverSection = () => {
    const init = () => {
        const allSlid: any = document.querySelectorAll('.slide');

        const DOM: any = {
            slides: [...allSlid],
            cursor: document.querySelector('.cursor'),
            backCtrl: document.querySelector('.frame__back'),
            navigationItems: document.querySelectorAll('.frame__nav > .frame__nav-button'),
        };
        DOM.cursorChars = DOM.cursor.querySelectorAll('.word > .char, .whitespace');
        DOM.backChars = DOM.backCtrl.querySelectorAll('.word > .char, .whitespace');
        const totalSlides = DOM.slides.length;
        let slidesArr: any = [];
        DOM.slides.forEach((slide: any) => {
            slidesArr.push(new Slide(slide));
        });



        // current slide position
        let current = -1;
        // check if animation is in progress
        let isAnimating = false;
        const setCurrentSlide = (position: any) => {
            if (current !== -1) {
                slidesArr[current].DOM.el.classList.remove(`${styles.slidecurrent}`);
            }

            current = position;
            slidesArr[current].DOM.el.classList.add(`${styles.slidecurrent}`);

            DOM.navigationItems[current].classList.add(`${styles.frame__navbuttoncurrent}`);
        };
        const next = () => {
            const newPosition = current < totalSlides - 1 ? current + 1 : 0;
            navigate(newPosition);
        };

        const prev = () => {
            const newPosition = current > 0 ? current - 1 : totalSlides - 1;
            navigate(newPosition);
        };





        const navigate = (newPosition: any) => {
            isAnimating = true;

            // change navigation current class
            DOM.navigationItems[current].classList.remove(`${styles.frame__navbuttoncurrent}`);
            DOM.navigationItems[newPosition].classList.add(`${styles.frame__navbuttoncurrent}`);

            // navigation direction
            const direction = current < newPosition ? current === 0 && newPosition === totalSlides - 1 ? 'prev' : 'next' : current === totalSlides - 1 && newPosition === 0 ? 'next' : 'prev';

            const currentSlide = slidesArr[current];
            current = newPosition;
            const upcomingSlide = slidesArr[current];

            gsap.timeline({
                defaults: {
                    duration: 1.6,
                    ease: 'power3.inOut'
                },
                onComplete: () => {
                    currentSlide.DOM.el.classList.remove(`${styles.slidecurrent}`);
                    // Close the current slide if it was open
                    if (currentSlide.isOpen) {
                        hideContent(currentSlide);
                    }

                    isAnimating = false;
                }
            })
                .addLabel('start', 0)

                .set([currentSlide.DOM.imgInner, upcomingSlide.DOM.imgInner], {
                    transformOrigin: direction === 'next' ? '50% 0%' : '50% 100%'
                }, 'start')

                // Place coming slide either above (translate -100%) or below (translate 100%) and the slide__inner to the opposite translate.
                .set(upcomingSlide.DOM.el, {
                    yPercent: direction === 'next' ? 100 : -100
                }, 'start')
                .set(upcomingSlide.DOM.inner, {
                    yPercent: direction === 'next' ? -100 : 100
                }, 'start')

                // Add current class
                .add(() => {
                    upcomingSlide.DOM.el.classList.add(`${styles.slidecurrent}`);
                }, 'start')

                // hide the back button and show back the cursor text if the current slide was open
                .add(() => {
                    if (currentSlide.isOpen) {
                        toggleCursorBackTexts();
                    }
                }, 'start')

                // Current slide moves either up or down (translate 100% or -100%)
                .to(currentSlide.DOM.el, {
                    yPercent: direction === 'next' ? -100 : 100
                }, 'start')
                .to(currentSlide.DOM.imgInner, {
                    scaleY: 2
                }, 'start')
                // Upcoming slide translates to 0
                .to([upcomingSlide.DOM.el, upcomingSlide.DOM.inner], {
                    yPercent: 0
                }, 'start')
                .to(upcomingSlide.DOM.imgInner, {
                    ease: 'power2.inOut',
                    startAt: { scaleY: 2 },
                    scaleY: 1
                }, 'start')
        };


        const showContent = (position: any) => {
            if (isAnimating) return;
            isAnimating = true;

            const slide = slidesArr[position];

            slide.isOpen = true;

            gsap.timeline({
                defaults: {
                    duration: 1.6,
                    ease: 'power3.inOut'
                },
                onStart: () => {

                },
                onComplete: () => {
                    isAnimating = false;
                }
            })
                .addLabel('start', 0)
                .add(() => {
                    toggleCursorBackTexts('content');
                }, 'start')
                .to(slide.DOM.img, {
                    yPercent: -100
                }, 'start')
                .set(slide.DOM.imgInner, {
                    transformOrigin: '50% 100%'
                }, 'start')
                .to(slide.DOM.imgInner, {
                    yPercent: 100,
                    scaleY: 2
                }, 'start')
                .to(slide.DOM.contentImg, {
                    startAt: {
                        transformOrigin: '50% 0%',
                        scaleY: 1.5
                    },
                    scaleY: 1
                }, 'start')
        };

        const hideContent = (slide: any, animate = false) => {
            // reset values
            isAnimating = true;

            const complete = () => {
                slide.isOpen = false;
                isAnimating = false;
            };

            if (animate) {
                gsap.timeline({
                    defaults: {
                        duration: 1.6,
                        ease: 'power3.inOut'
                    },
                    onComplete: complete
                })
                    .addLabel('start', 0)
                    .to(slide.DOM.img, {
                        yPercent: 0
                    }, 'start')
                    .to(slide.DOM.imgInner, {
                        yPercent: 0,
                        scaleY: 1
                    }, 'start');
            }
            else {
                gsap.set(slide.DOM.img, {
                    yPercent: 0
                });
                gsap.set(slide.DOM.imgInner, {
                    yPercent: 0,
                    scaleY: 1
                });
                complete();
            }
        };


        const toggleCursorBackTexts = (isContent?: any) => {
            return gsap.timeline({
                onStart: () => {
                    gsap.set(DOM.backChars, { opacity: isContent ? 0 : 1 });
                    if (isContent) {
                        DOM.backCtrl.classList.add(`${styles.frame__backshow}`);
                    }
                },
                onComplete: () => {
                    DOM.backCtrl.classList[isContent ? 'add' : 'remove'](`${styles.frame__backshow}`);
                    if (!isContent) {
                        DOM.backCtrl.classList.remove(`${styles.frame__backshow}`);
                    }
                }
            })
                .to(DOM.cursorChars, {
                    duration: 0.1,
                    ease: 'expo',
                    opacity: isContent ? 0 : 1,
                    stagger: {
                        amount: 0.5,
                        grid: 'auto',
                        from: 'random'
                    }
                })
                .to(DOM.backChars, {
                    duration: 0.1,
                    ease: 'expo',
                    opacity: isContent ? 1 : 0,
                    stagger: {
                        amount: 0.5,
                        grid: 'auto',
                        from: 'random'
                    }
                }, 0);
        };

        const initEvents = () => {
            // Links navigation
            [...DOM.navigationItems].forEach((item, position) => {
                item.addEventListener('click', () => {
                    if (current === position || isAnimating) return;
                    navigate(position);
                });
            });

            // Back click
            DOM.backCtrl.addEventListener('click', () => {
                if (isAnimating) return;
                isAnimating = true;
                toggleCursorBackTexts();
                hideContent(slidesArr[current], true);
            });

            // Initialize the GSAP Observer plugin
            Observer.create({
                type: 'wheel,touch,pointer',
                onDown: () => !isAnimating && prev(),
                onUp: () => !isAnimating && next(),
                // invert the mouse wheel delta
                wheelSpeed: -1,
                tolerance: 10
            });

            for (const [position, slide] of slidesArr.entries()) {
                slide.DOM.img.addEventListener('click', () => {
                    showContent(position);
                });
            }
        };
        setCurrentSlide(0);
        new CursorText(DOM.cursor);
        initEvents();
    }

    useEffect(() => {
        init()

    }, [])

    return (
        <PrimaryLayout>
            <div className={styles.frame}>
                <nav className={clsx(styles.frame__nav, 'frame__nav')}>
                    <button className={clsx(styles.frame__nav_button, styles.unbutton, "frame__nav-button")} >Stronger</button>
                    <button className={clsx(styles.frame__nav_button, styles.unbutton, "frame__nav-button")}>No choice</button>
                    <button className={clsx(styles.frame__nav_button, styles.unbutton, "frame__nav-button")}>Owned no longer</button>
                    <button className={clsx(styles.frame__nav_button, styles.unbutton, "frame__nav-button")}>Assert control</button>
                    <button className={clsx(styles.frame__nav_button, styles.unbutton, "frame__nav-button")}>Cold &amp; detached</button>
                </nav>
                <button className={clsx(styles.frame__back, styles.unbutton, 'frame__back')}>
                    <span data-splitting>&larr; Go back</span>
                </button>
                <span className={clsx(styles.frame__info, 'frame__info')}>&darr; Scroll or drag &darr;</span>
            </div>
            <div className={styles.slides}>
                {[{ title: 'Scroll down', order: 'first' }, { title: 'Animated with GSAP', order: 'second' }, { title: 'GreenSock', order: 'third' }, { title: 'Animation platform', order: "fourth" }, { title: 'Keep scrolling', order: "fifth" }].map((el, i) => {
                    return (
                        <div className={clsx(styles.slide, 'slide')} key={i}>
                            <div className={clsx(styles.slide__inner, 'slide__inner')}>
                                <div className={clsx(styles.slide__content, 'slide__content')}>
                                    <div className={clsx(styles[el.order], styles.slide__contentImg, 'slide__content-img')}></div>
                                    <h2>{el.title}</h2>
                                    <p>Cornered, I’m exhausted with fear. Our love and compassion dissolved. And demons, have materialised in me. Can’t fight them, they’re taking control.</p>
                                </div>
                                <div className={clsx(styles.slide__img, 'slide__img')}>
                                    <div className={clsx(styles[el.order], styles.slide__imgInner, 'slide__img-inner')}></div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={clsx(styles.cursor, 'cursor')}>
                <span className={clsx(styles.cursor__text, 'cursor__text')} data-splitting>+ Discover more</span>
            </div>
        </PrimaryLayout>
    )
}





export default ObserverSection;

