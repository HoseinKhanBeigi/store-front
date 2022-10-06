import { styled, useTheme } from "@mui/material/styles";

// import gsap from "gsap";
import { gsap } from "gsap";
import { useEffect } from 'react';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"
import styles from "../../styles/anchor.module.scss";
import { Container } from "@mui/material";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Panel = styled("article")(({ theme }) => ({
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
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



const AncherNavigation = () => {

    const init = () => {

        let panelsContainer: any = document.querySelector("#panels-container");
        let tween: any;
        document.querySelectorAll(".anchor").forEach(anchor => {
            anchor.addEventListener("click", function (e: any) {
                e.preventDefault();
                let targetElem = document.querySelector(e.target.getAttribute("href")),
                    y = targetElem;
                if (targetElem && panelsContainer.isSameNode(targetElem.parentElement)) {
                    let totalScroll = tween.scrollTrigger.end - tween.scrollTrigger.start,
                        totalMovement = (panels.length - 1) * targetElem.offsetWidth;
                    y = Math.round(tween.scrollTrigger.start + (targetElem.offsetLeft / totalMovement) * totalScroll);
                }
                gsap.to(window, {
                    scrollTo: {
                        y: y,
                        autoKill: false
                    },
                    duration: 1
                });
            });
        });

        /* Panels */
        const panels = gsap.utils.toArray("#panels-container .panel");
        tween = gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: "#panels-container",
                pin: true,
                start: "top top",
                scrub: 1,
                snap: {
                    snapTo: 1 / (panels.length - 1),
                    inertia: false,
                    duration: { min: 0.1, max: 0.1 }
                },
                end: () => "+=" + (panelsContainer.offsetWidth - window.innerWidth)
            }
        });
    };

    useEffect(() => {
        init()
    }, [])

    return (

        <div id="page" className="site">
            <div id="feather" className="feather"></div>

            <header id="masthead" className="site-header" role="banner">
                <nav className="anchor-nav" role="navigation">
                    <a href="#intro" className="anchor">
                        Home
                    </a>
                    <a href="#panel-1" className="anchor">
                        Panel 1
                    </a>
                    <a href="#panel-3" className="anchor">
                        Panel 3
                    </a>
                    <a href="#panel-5" className="anchor">
                        Panel 5
                    </a>
                    <a href="#map" className="anchor">
                        Map
                    </a>
                </nav>
            </header>

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
                                                        <a href="#panel-2" className="anchor">
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

    );
};

export default AncherNavigation
