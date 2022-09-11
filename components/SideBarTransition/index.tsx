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
                            { name: "classA", value: "classA" },
                            { name: "classB", value: "classB" },
                            { name: "classC", value: "classC" },
                            { name: "classE", value: "classE" },
                            { name: "classF", value: "classF" },
                            { name: "classG", value: "classG" },
                            { name: "classH", value: "classH" },
                        ],
                    }}
                />
                <GroupOfMenuItems
                    onClick={menuIn}
                    handleOnAnimationEnd={(e) => handleOnAnimationEnd(e)}
                    data={{
                        name: "classA",
                        items: [
                            { name: "math-A", value: "math-A" },
                            { name: "phsics-A", value: "phsics-A" },
                            { name: "chemestry-A", value: "chemestry-A" },
                            { name: "sport-A", value: "sport-A" },
                        ],
                    }}
                />
                <GroupOfMenuItems
                    onClick={menuIn}
                    handleOnAnimationEnd={(e) => handleOnAnimationEnd(e)}
                    data={{
                        name: "math-A",
                        items: [
                            { name: "math-A-1", value: "math-A-1" },
                            { name: "math-A-2", value: "math-A-2" },
                            { name: "math-A-3", value: "math-A-3" },
                            { name: "math-A-4", value: "math-A-4" },
                        ],
                    }}
                />
                <GroupOfMenuItems
                    onClick={menuIn}
                    handleOnAnimationEnd={(e) => handleOnAnimationEnd(e)}
                    data={{
                        name: "math-A-1",
                        items: [
                            { name: "A-1-1", value: "A-1-1" },
                            { name: "A-1-2", value: "A-1-2" },
                            { name: "A-1-3", value: "A-1-3" },
                            { name: "A-1-4", value: "A-1-4" },
                        ],
                    }}
                />

                <GroupOfMenuItems
                    onClick={menuIn}
                    handleOnAnimationEnd={(e) => handleOnAnimationEnd(e)}
                    data={{
                        name: "classB",
                        items: [
                            { name: "math-B", value: "math-B" },
                            { name: "phsics-B", value: "phsics-B" },
                            { name: "chemestry-B", value: "chemestry-B" },
                            { name: "sport-B", value: "sport-B" },
                        ],
                    }}
                />
                <GroupOfMenuItems
                    onClick={menuIn}
                    handleOnAnimationEnd={(e) => handleOnAnimationEnd(e)}
                    data={{
                        name: "classC",
                        items: [
                            { name: "math-C", value: "math-C" },
                            { name: "phsics-C", value: "phsics-C" },
                            { name: "chemestry-C", value: "chemestry-C" },
                            { name: "sport-C", value: "sport-C" },
                        ],
                    }}
                />
                <GroupOfMenuItems
                    onClick={menuIn}
                    handleOnAnimationEnd={(e) => handleOnAnimationEnd(e)}
                    data={{
                        name: "classD",
                        items: [
                            { name: "math-D", value: "math-D" },
                            { name: "phsics-D", value: "phsics-D" },
                            { name: "chemestry-D", value: "chemestry-D" },
                            { name: "sport-D", value: "sport-D" },
                        ],
                    }}
                />
                <GroupOfMenuItems
                    onClick={menuIn}
                    handleOnAnimationEnd={(e) => handleOnAnimationEnd(e)}
                    data={{
                        name: "classE",
                        items: [
                            { name: "math-E", value: "math-E" },
                            { name: "phsics-E", value: "phsics-E" },
                            { name: "chemestry-E", value: "chemestry-E" },
                            { name: "sport-E", value: "sport-E" },
                        ],
                    }}
                />
                <GroupOfMenuItems
                    onClick={menuIn}
                    handleOnAnimationEnd={(e) => handleOnAnimationEnd(e)}
                    data={{
                        name: "classF",
                        items: [
                            { name: "math-F", value: "math-F" },
                            { name: "phsics-F", value: "phsics-F" },
                            { name: "chemestry-F", value: "chemestry-F" },
                            { name: "sport-F", value: "sport-F" },
                        ],
                    }}
                />
                <GroupOfMenuItems
                    onClick={menuIn}
                    handleOnAnimationEnd={(e) => handleOnAnimationEnd(e)}
                    data={{
                        name: "classG",
                        items: [
                            { name: "math-G", value: "math-G" },
                            { name: "phsics-G", value: "phsics-G" },
                            { name: "chemestry-F", value: "chemestry-G" },
                            { name: "sport-G", value: "sport-G" },
                        ],
                    }}
                />
                <GroupOfMenuItems
                    onClick={menuIn}
                    handleOnAnimationEnd={(e) => handleOnAnimationEnd(e)}
                    data={{
                        name: "classH",
                        items: [
                            { name: "math-H", value: "math-H" },
                            { name: "phsics-H", value: "phsics-H" },
                            { name: "chemestry-F", value: "chemestry-H" },
                            { name: "sport-H", value: "sport-H" },
                        ],
                    }}
                />
            </div>
        </div>
    );
};

export default memo(SideBarTransition);

interface item {
    name: string;
    value: string;
}

interface TData {
    name: string;
    items: item[];
}

interface ItemsProps {
    data: TData;
    onClick: (name: string, dataName: string) => void;
    handleOnAnimationEnd: (el: any) => void;
}

const GroupOfMenuItems = forwardRef<HTMLUListElement, ItemsProps>(
    ({ data, onClick, handleOnAnimationEnd }, ref) => {
        const handleClick = useCallback((name: string, dataName: string) => {
            onClick(name, dataName);
        }, []);

        return (
            <ul
                data-name={data.name}
                className={styles.menuLevel}
                onAnimationEnd={handleOnAnimationEnd}
                ref={ref}
            >
                {data.items.map((item: item, i: number) => {
                    return (
                        <li
                            key={i}
                            className={styles.menuItem}
                            data-name={item.name}
                            onClick={() => handleClick(item.name, data.name)}
                        >
                            <a
                                className={styles.menuLink}
                                data-submenu="submenu-1"
                                aria-owns="submenu-1"
                                href="#"
                            >
                                {item.value}
                            </a>
                        </li>
                    );
                })}
            </ul>
        );
    }
);
