import { styled } from "@mui/material/styles";
import { useEffect } from 'react';
import clsx from "clsx";
import { gsap } from "gsap";
import { PrimaryLayout } from '../../components/primaryLayout/index';
import styles from "../../styles/draggableScroll.module.scss";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Draggable from 'react-draggable';




const DraggableScroll = () => {
    gsap.registerPlugin(ScrollTrigger);
    const Section = styled('section')(({ }) => ({
        minHeight: '100vh',
        padding: '8rem 0 max(5vh, 2rem)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'hsl(var(--h, 0) 75% 60%)'
    }));

    const Image = styled("img")(({ theme }) => ({
        display: 'block',
        width: '100%',
        height: 'auto',
        maxWidth: '100%'
    }));

    const init = () => {
        const scrollContainer = document.querySelector('[data-scroller]')
        const sections = gsap.utils.toArray('section')
        const track: any = document.querySelector('[data-draggable]')
        const navLinks: any = gsap.utils.toArray('[data-link]')
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

        const lastItemWidth = () => navLinks[navLinks.length - 1].offsetWidth

        const getUseableHeight = () => document.documentElement.offsetHeight - window.innerHeight;

        const getDraggableWidth = () => {
            return ((track.offsetWidth * 0.5) - lastItemWidth())
        }

        const updatePosition = () => {
            const left = track.getBoundingClientRect().left * -1
            const width = getDraggableWidth()
            const useableHeight = getUseableHeight()
            const y = gsap.utils.mapRange(0, width, 0, useableHeight, left)

            st.scroll(y)
        };
        const tl = gsap.timeline()
            .to(track, {
                x: () => getDraggableWidth() * -1,
                ease: 'none'
            })

        const st = ScrollTrigger.create({
            animation: tl,
            scrub: 0,
        });

        // const draggableInstance = Draggable.create(track, {
        //     type: 'x',
        //     bounds: {
        //         minX: 0,
        //         maxX: getDraggableWidth() * -1
        //     },
        //     // edgeResistance: 1,
        //     // onDragStart: () => st.disable(),
        //     // onDragEnd: () => st.enable(),
        //     // onDrag: updatePosition,
        //     // onThrowUpdate: updatePosition
        // });


        const initSectionAnimation = () => {
            /* Do nothing if user prefers reduced motion */
            if (prefersReducedMotion.matches) return

            sections.forEach((section: any, index) => {
                const heading = section.querySelector('h2')
                const image = section.querySelector(`.${styles.section__image}`)

                /* Set animation start state */
                gsap.set(heading, {
                    opacity: 0,
                    y: 50
                })
                gsap.set(image, {
                    opacity: 0,
                    rotateY: 15
                })

                /* Create the timeline */
                const sectionTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: () => 'top center',
                        end: () => `+=${window.innerHeight}`,
                        toggleActions: 'play reverse play reverse',
                        // toggleClass: 'is-active',
                        // markers: true,
                    }
                })

                /* Add tweens to the timeline */
                sectionTl.to(image, {
                    opacity: 1,
                    rotateY: -5,
                    duration: 6,
                    ease: 'elastic'
                })
                    .to(heading, {
                        opacity: 1,
                        y: 0,
                        duration: 2
                    }, 0.5)

                /* Create a new timeline to add an active class to the nav link for the current section */
                const sectionTl2 = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 20px',
                        end: () => `bottom top`,
                        toggleActions: 'play none play reverse',
                        onToggle: ({ isActive }) => {
                            const sectionLink = navLinks[index]

                            if (isActive) {
                                sectionLink.classList.add(`${styles.isactive}`)
                            } else {
                                sectionLink.classList.remove(`${styles.isactive}`)
                            }
                        }
                    }
                })
            })
        };
        initSectionAnimation();
    };

    useEffect(() => {
        init();
    }, [])



    return (
        <PrimaryLayout>
            <nav className={clsx(styles.navi)}>
                <div className={clsx(styles.marker)}></div>
                <Draggable
                    axis="x"
                    handle=".handle"
                    defaultPosition={{ x: 0, y: 0 }}
                    grid={[25, 25]}
                    scale={1}
                // onStart={this.handleStart}
                // onDrag={this.handleDrag}
                // onStop={this.handleStop}
                >
                    <div className={clsx(styles.nav__track)} data-draggable>
                        <ul className={clsx(styles.nav__list)}>
                            <li>
                                <a href="#section_1" className={clsx(styles.nav__link)} data-link><span>1993</span></a>
                            </li>
                            <li>
                                <a href="#section_2" className={clsx(styles.nav__link)} data-link><span>1995</span></a>
                            </li>
                            <li>
                                <a href="#section_3" className={clsx(styles.nav__link)} data-link><span>1997</span></a>
                            </li>
                            <li>
                                <a href="#section_4" className={clsx(styles.nav__link)} data-link><span>2000</span></a>
                            </li>
                            <li>
                                <a href="#section_5" className={clsx(styles.nav__link)} data-link><span>2001</span></a>
                            </li>
                            <li>
                                <a href="#section_6" className={clsx(styles.nav__link)} data-link><span>2003</span></a>
                            </li>
                            <li>
                                <a href="#section_7" className={clsx(styles.nav__link)} data-link><span>2007</span></a>
                            </li>
                            <li>
                                <a href="#section_8" className={clsx(styles.nav__link)} data-link><span>2011</span></a>
                            </li>
                            <li>
                                <a href="#section_9" className={clsx(styles.nav__link)} data-link><span>2016</span></a>
                            </li>
                        </ul>
                    </div>
                </Draggable>
            </nav>
            {
                [1, 2, 3, 4, 5, 6, 7, 8, 9].map((count: number, index: number) => {
                    return (

                        <Section id={`section_${count}`} key={index} style={{}}>
                            <div className={clsx(styles.container)}>
                                <h2 className={clsx(styles.section__heading)}>
                                    <span>1993</span>
                                    <span>Pablo Honey</span>
                                </h2>
                                <div className={clsx(styles.section__image)}>
                                    <Image src="https://assets.codepen.io/85648/radiohead_pablo-honey.jpg" width="1200" height="1200" />
                                </div>
                            </div>
                        </Section>

                    )
                })
            }

        </PrimaryLayout >
    )

}

export default DraggableScroll;