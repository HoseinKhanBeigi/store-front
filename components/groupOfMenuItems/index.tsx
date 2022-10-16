import { forwardRef, useCallback } from "react";
import styles from "../../styles/sideBarTransition.module.scss";
interface item {
    name: string;
    title: string;
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
                                {item.title}
                            </a>
                        </li>
                    );
                })}
            </ul>
        );
    }
);

GroupOfMenuItems.displayName = 'GroupOfMenuItems';

export default GroupOfMenuItems;
