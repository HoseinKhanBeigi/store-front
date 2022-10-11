import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import { PrimaryLayout } from "../../components/primaryLayout";
import { useEffect, useState } from "react";
import { styled } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface PropStyle {
    scaleX: number,
    translateY: number
}

const ContainerHeadline = styled("h2")(({ theme }) => ({
    fontSize: '5vmin'
}));

const Wrapper = styled("div")(({ theme }) => ({
    background: 'black',
    fontFamily: '"IBM Plex Sans", sans-serif',
    backgroundColor: theme.palette.primary.main
}));



const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
        color: 'white',
        textAlign: 'center'
    },
    heroImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '160%',
        objectFit: 'cover'
    },

    heroInner: {
        display: 'flex',
        position: 'relative',
        width: '100vw',
        maxHeight: '100vh',
        overflow: 'hidden',
        '&::before': {
            content: '""',
            display: 'block',
            paddingBottom: 'calc(100% / (16 / 9))'
        }
    },
    heroContent: {
        position: 'absolute',
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    heroHeadLine: {
        position: 'relative',
        display: 'inline-block',
        fontSize: '10vmin',
        overflow: 'hidden',
        marginTop: 'calc(1.5vmin * -1)',
        padding: '1.5vmin',
        '&::after': {
            content: '""',
            position: 'absolute',
            top: 'calc(100% - 1.5vmin)',
            left: 0,
            backgroundColor: 'white',
            width: '100%',
            height: '1.5vmin',
            transform: (props: PropStyle) => `scaleX(${props.scaleX})`,
            transition: 'transform 400ms calc(400ms / 2) cubic-bezier(0.25, 1, 0.5, 1)'
        }
    },

    title: {
        display: 'block',
        transform: (props: PropStyle) => `translateY(${props.translateY}%)`,
        transition: 'transform 400ms cubic-bezier(0.25, 1, 0.5, 1)'
    }
}));

import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const PinSection = () => {
    const [makeStyleProps, setMake] = useState({
        scaleX: 0,
        translateY: 110
    });
    const titleOne = "That's pretty neat."
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
                                {titleOne}
                            </span>
                        </div>
                    </div>
                </section>
                <footer className={clsx(classes.container)}>
                    <ContainerHeadline className="container__headline">
                        {titleOne}
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
                                {titleOne}
                            </span>
                        </div>
                    </div>
                </section>
                <footer className={clsx(classes.container)}>
                    <ContainerHeadline className="container__headline">
                        {titleOne}
                    </ContainerHeadline>
                </footer>
            </Wrapper>
        </PrimaryLayout>
    )

}
export default PinSection