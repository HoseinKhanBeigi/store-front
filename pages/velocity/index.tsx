import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import { useEffect } from 'react';
import { PrimaryLayout } from "../../components/primaryLayout";
import { styled } from "@mui/material";

const PanelsContainer = styled("div")(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    padding: 0,
    justifyContent: "center"

}));

const Image = styled("img")(({ theme }) => ({
    padding: theme.spacing(3)
}));

const Velocity = () => {
    gsap.registerPlugin(ScrollTrigger);
    const init = () => {
        let proxy = { skew: 0 };
        let skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg");
        let clamp = gsap.utils.clamp(-20, 20);
        ScrollTrigger.create({
            onUpdate: (self) => {
                let skew = clamp(self.getVelocity() / -300);
                if (Math.abs(skew) > Math.abs(proxy.skew)) {
                    proxy.skew = skew;
                    gsap.to(proxy, { skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew) });
                }
            }
        });
    }

    useEffect(() => {
        init()
    }, [])
    return (
        <PrimaryLayout>
            <PanelsContainer>
                <Image width="600" height="600" src="https://picsum.photos/600/600?random=1" alt="" className="skewElem" />
                <Image width="600" height="600" src="https://picsum.photos/600/600?random=2" alt="" className="skewElem" />
                <Image width="600" height="600" src="https://picsum.photos/600/600?random=3" alt="" className="skewElem" />
                <Image width="600" height="600" src="https://picsum.photos/600/600?random=4" alt="" className="skewElem" />
                <Image width="600" height="600" src="https://picsum.photos/600/600?random=5" alt="" className="skewElem" />
                <Image width="600" height="600" src="https://picsum.photos/600/600?random=6" alt="" className="skewElem" />
                <Image width="600" height="600" src="https://picsum.photos/600/600?random=7" alt="" className="skewElem" />
                <Image width="600" height="600" src="https://picsum.photos/600/600?random=8" alt="" className="skewElem" />
                <Image width="600" height="600" src="https://picsum.photos/600/600?random=9" alt="" className="skewElem" />
                <Image width="600" height="600" src="https://picsum.photos/600/600?random=10" alt="" className="skewElem" />
            </PanelsContainer>
        </PrimaryLayout>
    )
}

export default Velocity