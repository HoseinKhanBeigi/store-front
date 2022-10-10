import { styled } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import { PrimaryLayout } from "../../components/primaryLayout";
import { useEffect, useState } from "react";
import { ContainerHeadline, useStyles, Wrapper } from "./styles"
import clsx from "clsx";
gsap.registerPlugin(ScrollTrigger);

const PinSection = () => {
    const [makeStyleProps, setMake] = useState({
        scaleX: 0,
        translateY: 110
    });
    const classes = useStyles(makeStyleProps);
    const init = () => {
        gsap.utils.toArray('.hero').forEach((section: any) => {
            gsap.to(section, {
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    pin: true,
                    start: "center center",
                    end: "bottom -100%",
                    toggleClass: "active",
                    onToggle: self => {
                        if (self.isActive) {
                            setMake({
                                scaleX: 1,
                                translateY: 0
                            })
                        } else {
                            setMake({
                                scaleX: 0,
                                translateY: 110
                            })
                        }

                    }
                },
                ease: "power2"
            });

            gsap.to(".hero__image", {
                scrollTrigger: {
                    trigger: section,
                    scrub: 0.5,
                    start: "top bottom",
                    end: "bottom -300%",
                },
                ease: "power2",
                y: "-30%"
            });
        })

    }

    useEffect(() => {
        init();
    }, [])
    return (
        <PrimaryLayout>
            <Wrapper>
                <header className={clsx(classes.container)}>
                    <ContainerHeadline className="container__headline">
                        Wanna see something neat?
                    </ContainerHeadline>
                </header>
                <section className={clsx(classes.container, 'hero')}>
                    <div className={classes.heroInner}>
                        <div className={clsx(classes.heroImage, 'hero__image')}>
                            <img className={clsx(classes.heroImage, 'hero__image')} src={"https://images.unsplash.com/photo-1508781197106-d8c535dcf276?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"} />
                        </div>
                    </div>
                    <div className={clsx(classes.heroContent, 'hero__content')}>
                        <div className={clsx(classes.heroHeadLine, 'hero__headline')}>
                            <span className={classes.title}>
                                How Neat is That?
                            </span>
                        </div>
                    </div>
                </section>
                <footer className={clsx(classes.container)}>
                    <ContainerHeadline className="container__headline">
                        That's pretty neat.
                    </ContainerHeadline>
                </footer>
                <section className={clsx(classes.container, 'hero')}>
                    <div className={classes.heroInner}>
                        <div className={clsx(classes.heroImage, 'hero__image')}>
                            <div className={clsx(classes.heroImage, 'hero__image')} />
                        </div>
                    </div>
                    <div className={clsx(classes.heroContent, 'hero__content')}>
                        <div className={clsx(classes.heroHeadLine, 'hero__headline')}>
                            <span className={classes.title}>
                                How Neat is That?
                            </span>
                        </div>
                    </div>
                </section>
                <footer className={clsx(classes.container)}>
                    <ContainerHeadline className="container__headline">
                        That's pretty neat.
                    </ContainerHeadline>
                </footer>
            </Wrapper>
        </PrimaryLayout>
    )

}
export default PinSection