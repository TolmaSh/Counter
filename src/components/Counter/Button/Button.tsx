import React from 'react';
import s from "../Counter.module.css";


type propsType = {
    onClick: () => void
    btnName: string
    disabledBtn: boolean
}
export const Button = ({onClick, btnName, disabledBtn}: propsType) => {


    return (
        <button disabled={disabledBtn} className={s.btn} onClick={onClick}>{btnName}</button>
    );
};
