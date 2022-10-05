import React, { useEffect } from "react";
import clsx from "clsx"
import style from "../../styles/menu-btn.module.scss";

interface Props {
    openMenu: () => void;
    setPosition: (e: any) => void;
    status: boolean;
}

export const Menu: React.FC<Props> = ({ openMenu, setPosition, status }) => {
    const toggel = () => {
        if (!status)
            openMenu()
        else {
            setPosition(false)
        }
    }
    return (
        <div className={clsx(style.btMenu, style.item)} onClick={toggel}>
            <div className={style.icoMenu}>
                <div className={style.bar}></div>
                <div className={style.bar}></div>
                <div className={style.bar}></div>
            </div>
            <span>
                Menu
            </span>
        </div>
    );
};
