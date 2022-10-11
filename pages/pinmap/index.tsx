import clsx from "clsx";
import { gsap } from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
const DrawSVGPlugin = require("../../lib/draw")
import { PrimaryLayout } from "../../components/primaryLayout";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    container: {
        opacity: 0
    },
    wrapper: {
        width: "100%",
        height: '100%',
        overflowX: 'hidden',
        background: '#f2efe9'
    },
    elPosition: {
        position: 'absolute',
    }
}));


const PinMap = () => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, DrawSVGPlugin);
    const classes = useStyles();
    const init = () => {
        gsap.set('#scrollDist', { width: '100%', height: '500%' });
        gsap.set('#container', { position: 'fixed', width: 7900, height: 5600, transformOrigin: '0 0' });
        gsap.to('#container', { duration: 1, opacity: 1, ease: 'power2.inOut', delay: 0.3 });
        gsap.timeline({
            scrollTrigger: {
                trigger: '#scrollDist',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1
            }
        })
            .to('#c', { motionPath: '#p', immediateRender: true, ease: 'none' }, 0)
            .from('#p', { drawSVG: '0% 0%', ease: 'none' }, 0)

        const myFunction = () => {
            gsap.to('#container', { duration: 0.7, x: -gsap.getProperty('#c', 'x'), y: -gsap.getProperty('#c', 'y') })
        };
        gsap.ticker.add(myFunction);
        gsap.set('#container', { left: window.innerWidth / 2, top: window.innerHeight / 2 });
    };
    useEffect(() => {
        init()
    }, [])
    return (
        <PrimaryLayout>
            <div className={classes.wrapper}>
                <div id="scrollDist" className={classes.elPosition}></div>
                <div id="container" className={clsx(classes.elPosition, classes.container)}>
                    <img src="https://assets.codepen.io/721952/mtp.png" className={classes.elPosition} />
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={classes.elPosition}>
                        <circle id="c" r="10" fill="#1c1616" />
                        <path id="p" stroke="#f00" strokeWidth="5" fill="none" d="M3847.5,2753.5l-6,4c0,0-8,4-6,7s21,35,23,39s-0.56,5.75-0.56,5.75L3690.5,2923.5c0,0-13,10-15,20s-4,62-7,73s-7,27-30,43s-49,27-55,30s1,13,0,20s-35,27-42,35s-5,19,0,35s17,31-5,47s-27,4-33,10s-122,102-129,110s-17,16-16,31v60c0,0,25,13,33,15s59,6,68,13s21,18,23,24s2,11-16,25s-601,583-601,583s-104-109-113-114s-14-10-28-26s-63-67-68-76s-76-83-85-95s-34-38-60-51s-115-36-129-39s-35-8-46-6s-55,6-65,5s-35,0-43-3s-31-18-41-30s-32-34-43-42s-42-25-58-29s-306-50-336-54s-275-44-314-48s-62-4-78-1s-33,11-40,24s-17,31-11,50s24,41,31,57s6,5,6,5l-7-15c0,0-17-25-20-32s-17-28-3-52s17-22,26-26s13-7,34-8s51,2,73,4s324,49,381,58s228,35,244,39c0,0,48,12,67,30s32,29,40,38s37,31,44,33c2,5-1,4-9,5s-20,3-30,8s-37,5-49,7s-42,0-49,4s-25,15-29,25c0,0-17,35-19,46s-3,25,3,31s15,12,22,13s19,5,24,11s7,8,8,14s0,43-1,50s-4,12-7,15s-9,2-10,5s-4,7,0,9s10,1,15,6s9,14,12,17s10,10,16,9s16-4,22-7s15-5,21,1s11,7,9,4s-7-9-13-10s-13-2-16,0s-17,17-23,16s-13-4-16-7s-5-13-8-11s-14,5-19,5s-15-3-16,1s-5,20-6,23s-6,6-13,10s-36,19-36,19c-7,4-7,1-2-2s40-20,42-22s6-3,7-11s3-17,4-19s3-8,8-13s6-8,10-7s10-1,11-4s1-5,5-9s6-8,8-21s1-43,0-50s-7-18-16-21s-16-4-22-6s-18-9-19-18s0-14,5-27s17-45,25-50s15-10,28-11s60-4,68-5s15-4,18-6s15-6,23-6s13-1,15-3s4-4,6-5s5,0,10,1s21,4,26,3s15-2,16-1s1,4,1,8s4,11,11,18s11,12,13,16s5,12,6,19s-1,16,7,26s24,19,34,20s36,3,53-2s27-7,27-9s0-13-1-15s-10-20-10-26s7-38,8-41s2-1,8,1s32,10,40,12s34,13,44,20s29,23,38,34s41,45,46,51s20,24,22,26s-1,4-3,5s-11,8-13,9s0,2,5,7s17,21,19,23s0,3-3,5s-14,11-16,11s-4-5-7-3s-6,6-10,1s-8-11-11-11s-37,13-41,14s-4,3-3,5s3,8,7,9s29-8,32-8s3,1,3,4s2,25,3,26s4-1,7-4s28-23,29-21s74,82,76,85s4,4,7,2s9-7,11-9s3-2,7,2s102,104,105,107s6,7,2,10s-14,12-16,14s-2,5,1,8s84,83,86,86s4,2,8-2s11-11,14-14s4-2,7,1s37,39,43,45s21,21,26,32s9,22,13,43s3,21,5,23s0-3,0-5s-4-30-7-39s-7-22-10-26s-52-60-62-69s-10-10-8-12s322-309,325-312s3-3,6,3s367,733,369,738s7,11,0,14s-181,90-185,93s-12,4-23,4s-149,1-153,0s-16-2-25-5s-30-8-39-9s-34-5-48-6s-15-1-20-1s-14-1-22-2s-16-3-25-20s-26-29-33-35s-29-22-38-36s-28-51-32-69s-4-16-8-17s-4,1-1,2s4,1,4,5s3,12,5,19s17,44,25,55s12,17,19,23s23,21,32,27s13,12,18,19s7,11,11,17s12,12,20,13s23,2,26,2s5-3,7-8s4-7,3-10s-2-4-6-3s-6,2-5,4s2,4,4,3s3-2,3,0s-1,4-2,7s-5,7,0,8s16-2,17,0s1,6,0,13s0,6,4,7s44,11,50,11s16-1,20-4s9-6,11-6s3,2,2,7s-1,9,2,10s17,2,20,4s6,3,13,3s49,1,50,1s3,3,2,8s0,6,5,6s38-1,45-2s42-14,44-15s7-5,9-4s3,3,7,1s58-30,62-33s284-145,288-147s6-3,7-1s2,5,4,9s2,7,9,3s167-86,171-88s6-1,8,3s10,20,11,23s3,5,11,1s31-15,39-24s56-53,58-55s23-61,24-64s-1-7-6-11s-24-25-25-27s-4-4,3-10s28-24,28-29s-1-9,6-12s63-30,76-38s33-20,36-22s5,0,7,2s8,9,17,9s45,0,75-18s51-33,54-35s10,0,13,3s8,5,13,1s355-210,357-213s7-6,4-15s-14-25-15-28s0-6,4-7s5-5,3-7s-3-7,1-9s42-24,45-26s2-8,0-12s-14-36-17-40s-16-24-16-27s3-7,9-10s9-7,11-6s6,1,7-1s9-13,14-14s15-4,18-5s13-7,15-7s4-1,8-5s39-36,41-37s40-13,46-16s38-16,41-18s58-37,62-39s64-36,68-38s36-15,39-15s26-1,33-5s57-36,71-40s36-13,49-15s29-11,31-13s12-14,19-17s16-8,19-8s4,2,6,8s44,123,45,127s3,7,9,5s115-40,123-42s100-26,109-28s136-38,139-38s4-1,5,3s4,19,6,21s30-6,32-7s1-3,0-7s-4-20-6-21s-12,0-23,3s-242,64-264,70s-110,36-116,39s-10,6-12,1s-45-129-47-133s-5-5-9-3s-15,7-20,10s-13,9-17,14s-22,13-27,14s-35,8-48,13s-59,33-72,39s-24,6-34,7s-28,10-43,17s-55,28-63,33s-27,16-33,21s-24,17-34,22s-27,13-40,18s-41,14-45,16s-42,38-45,40s-19,9-26,11s-15,2-18,6s-11,16-11,18s1,4,4,10c0,0,28,57,29,61s1,7-5,8s-65,33-70,36s-10,5-14-2s-178-316-183-325s-37-63-79-119s-154-207-163-219s-224-300-231-308s-71-80-91-97s-87-90-90-95s-7-2-12,1s-52,34-54,35s-3,1-6-3s-19-31-20-33s-3-4,1-7c3.58-2.68,7-5,7-5" />
                    </svg>
                </div>
            </div>
        </PrimaryLayout>
    )
}

export default PinMap