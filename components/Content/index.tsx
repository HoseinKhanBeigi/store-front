import * as React from "react";
import type { ReactNode } from 'react';
import style from "../../styles/content.module.scss"

interface Props {
    open: boolean,
    children: ReactNode
}

const Content: React.FC<Props> = ({ children, open }) => {
    return <div className={style.content}>{children}</div>;
};

export default Content;
