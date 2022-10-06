import React, {
    forwardRef,
    memo,
    useEffect,
    useState,
    useRef,
    useCallback,
} from "react";
import styles from "../../styles/sideBarTransition.module.scss";
import { ArrowForward } from "../asset";
import { GroupOfMenuItems } from "./groupOfMenuItems";

const SideBarTransition: React.FC = () => {
    const dataSubmenu: any = useRef(null);
    const root: any = useRef(null);
    const [BreadcrumbList, setBreadcrumb] = useState(["root"]);
    const [element, setElement] = useState("root");
    useEffect(() => {
        if (root.current.getAttribute("data-name") === "root") {
            root.current.classList.add(`${styles.currentMenu}`);
        }
    }, []);

    const handleOnAnimationEnd = (el: any) => {
        if (el.target.parentNode.getAttribute("data-name") !== element) {
            el.target.parentNode.classList.remove(`${styles.currentMenu}`);
            el.target.parentNode.classList.remove(`${styles.animateOutToLeft}`);
            el.target.parentNode.classList.remove(`${styles.animateOutToRight}`);
        }
    };

    const findMenu = (value: string) => {
        return Array.from(dataSubmenu.current.children).find(
            (el: any) => el.getAttribute("data-name") === value
        );
    };

    const menuIn = (name: string, dataName: string) => {
        const hideMenu: any = findMenu(dataName);
        const visibleMenu: any = findMenu(name);
        if (!visibleMenu) {
            return;
        }

        const clickPosition = [...hideMenu.children].findIndex(
            (item) => item.getAttribute("data-name") === name
        );
        const createCurve = [...hideMenu.children, ...visibleMenu.children];
        createCurve.forEach((item: any, pos: number) => {
            item.style.animationDelay =
                parseInt(Math.abs(clickPosition - pos) * 60) + "ms";
        });

        setElement(name);
        visibleMenu.classList.add(`${styles.currentMenu}`);
        visibleMenu.classList.add(`${styles.animateInFromRight}`);
        hideMenu.classList.add(`${styles.animateOutToLeft}`);
        hideMenu.classList.remove(`${styles.animateInFromRight}`);
        hideMenu.classList.remove(`${styles.animateInFromLeft}`);
        //add Breadcrumb
        setBreadcrumb((prev) => [...prev, name]);
    };

    const menuOut = (name: string, dataName: string, index?: any) => {
        if (name === dataName) {
            return;
        }
        const hideMenu: any = findMenu(dataName);
        const visibleMenu: any = findMenu(name);
        const clickPosition = [...hideMenu.children].findIndex(
            (item) => item.getAttribute("data-name") === name
        );
        const createCurve = [...hideMenu.children, ...visibleMenu.children];
        createCurve.forEach((item: any, pos: number) => {
            item.style.animationDelay =
                parseInt(Math.abs(clickPosition - pos) * 60) + "ms";
        });

        setElement(name);
        visibleMenu.classList.add(`${styles.currentMenu}`);
        visibleMenu.classList.add(`${styles.animateInFromLeft}`);
        hideMenu.classList.add(`${styles.animateOutToRight}`);
        hideMenu.classList.remove(`${styles.animateInFromLeft}`);
        hideMenu.classList.remove(`${styles.animateInFromRight}`);
        //remove Breadcrumb
        const Breadcrumbs = [...BreadcrumbList];
        Breadcrumbs.splice(index + 1, BreadcrumbList.length - index + 1);
        setBreadcrumb(Breadcrumbs);
    };

    return (
        <div className={styles.menu}>
            <ul>
                {BreadcrumbList.map((label: string, index: number) => (
                    <div
                        key={index}
                        onClick={() => {
                            menuOut(label, BreadcrumbList[BreadcrumbList.length - 1], index);
                        }}
                    >
                        <ArrowForward color="white" width="25" height="25" />
                        {label}
                    </div>
                ))}
            </ul>
            <div className={styles.menuWrap} ref={dataSubmenu}>
                <GroupOfMenuItems
                    ref={root}
                    onClick={menuIn}
                    handleOnAnimationEnd={(e) => handleOnAnimationEnd(e)}
                    data={{
                        name: "root",
                        items: [
                            { name: "scrollTrigger", value: "scrollTrigger" },

                        ],
                    }}
                />
                <GroupOfMenuItems
                    onClick={menuIn}
                    handleOnAnimationEnd={(e) => handleOnAnimationEnd(e)}
                    data={{
                        name: "scrollTrigger",
                        items: [
                            { name: "math-A", value: "math-A" },
                            { name: "phsics-A", value: "phsics-A" },
                            { name: "chemestry-A", value: "chemestry-A" },
                            { name: "sport-A", value: "sport-A" },
                        ],
                    }}
                />
            </div>
        </div>
    );
};

export default memo(SideBarTransition);