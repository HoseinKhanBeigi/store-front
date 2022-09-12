import React, { useEffect } from "react";
import clsx from "clsx"
import style from "../../styles/menu-btn.module.scss";

export const Menu = () => {
    return (
        <div className={clsx(style.btMenu, style.item)}>
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
