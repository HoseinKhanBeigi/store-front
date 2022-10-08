import { styled, useTheme } from "@mui/material/styles";
import { useRef } from "react"

// import gsap from "gsap";
import { gsap } from "gsap";
import { useEffect } from 'react';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"
import styles from "../../styles/anchor.module.scss";
import { PrimaryLayout } from "../../components/primaryLayout";
import type { NextPageWithLayout } from "../_app";
import { Container } from "@mui/material";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Panel = styled("article")(({ theme }) => ({
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
    fontSize: '1.5em',
    textAlign: 'left',
    color: '#333',
    position: 'relative',
    boxSizing: 'border-box',
    padding: '10px',
    borderRight: '1px solid #f00'
}));

const FullScreenSection = styled("section")(({ theme }) => ({
    display: "block",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
}));

const PanelsContainer = styled("div")(({ theme }) => ({
    width: "500%",
    height: '100vh',
    display: 'flex',
    flexWrap: 'nowrap',
    padding: 0,
    overflow: 'hidden',
    backgroundColor: '#ddd'
}));

const Anchor = styled('a')(({ theme }) => ({
    textDecoration: 'none',
    padding: theme.spacing(3),
}));

const NaviagetionAnchor = styled('nav')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));





const AncherNavigation = () => {
    let tween: any = useRef();
    let panelsContainer: any = useRef();
    const panels: any = useRef();
    const init = () => {
        panelsContainer.current = document.querySelector("#panels-container")
        panels.current = gsap.utils.toArray("#panels-container .panel");
        tween.current = gsap.to(panels.current, {
            xPercent: -100 * (panels.current.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: "#panels-container",
                pin: true,
                start: "top top",
                scrub: 1,
                end: () => "+=" + (panelsContainer.current.offsetWidth - window.innerWidth)
            }
        });
    };

    const handleClick = (e: any) => {
        e.preventDefault();
        let targetElem = document.querySelector(e.target.getAttribute("href")),
            y = targetElem;
        if (targetElem && panelsContainer.current.isSameNode(targetElem.parentElement)) {
            let totalScroll = tween.current.scrollTrigger.end - tween.current.scrollTrigger.start,
                totalMovement = (panels.current.length - 1) * targetElem.offsetWidth;
            y = Math.round(tween.current.scrollTrigger.start + (targetElem.offsetLeft / totalMovement) * totalScroll);
        }
        gsap.to(window, {
            scrollTo: {
                y: y,
                autoKill: false
            },
            duration: 1,
        });
    }

    useEffect(() => {
        init()
    }, [])

    const HeaderContent = () => {
        return (
            <NaviagetionAnchor className="anchor-nav" role="navigation">
                <Anchor href="#intro" className="anchor" onClick={handleClick}>
                    Home
                </Anchor>
                <Anchor href="#panel-1" className="anchor" onClick={handleClick}>
                    Panel 1
                </Anchor>
                <Anchor href="#panel-3" className="anchor" onClick={handleClick}>
                    Panel 3
                </Anchor>
                <Anchor href="#panel-5" className="anchor" onClick={handleClick}>
                    Panel 5
                </Anchor>
                <Anchor href="#map" className="anchor" onClick={handleClick}>
                    Map
                </Anchor>
            </NaviagetionAnchor>
        )
    }

    return (
        <PrimaryLayout HeaderContent={HeaderContent}>
            <div id="page" className="site">
                <main id="content" className="site-content" role="main">
                    <FullScreenSection id="intro" className={`panel full-screen ${styles.blue}`}>
                        <h1>A cool title</h1>

                        <div id="clouds-layer-1" className="clouds"></div>
                        <div id="clouds-layer-2" className="clouds"></div>
                    </FullScreenSection>
                    <section id="panels">
                        <PanelsContainer id="panels-container">
                            {[1, 2, 3, 4, 5].map((num, i) => {
                                const red = 'red'
                                return (
                                    <Panel key={i} id={`panel-${num}`} className={`panel full-screen ${styles[red]}`}>
                                        <Container maxWidth="sm">
                                            <div className="row">
                                                <div className="col-6">
                                                    <img src="" alt="" />
                                                </div>
                                                <div className="col-6 d-flex flex-column">
                                                    <h2>Panel {num}</h2>

                                                    <p className="step-description">
                                                        Lorem Ipsum is simply dummy text of the printing and
                                                        typesetting industry. Including versions of Lorem Ipsum.
                                                    </p>

                                                    <div className="panels-navigation text-right">
                                                        <div className="nav-panel" data-sign="plus">
                                                            <a href={`#panel-${num + 1}`} className="anchor" onClick={handleClick}>
                                                                Next
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Container>
                                    </Panel>
                                )
                            })}
                        </PanelsContainer>
                    </section>
                    <FullScreenSection id="map" className="full-screen"></FullScreenSection>
                </main>
            </div>
        </PrimaryLayout>

    );
};

export default AncherNavigation
