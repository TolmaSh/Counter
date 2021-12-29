import React from 'react';
import s from "../Counter.module.css";


type propsType = {
    count: number
    endVal: number
}


export const CounterValue = ({count, endVal}: propsType) => {
    const EndCounterClass = count >= endVal ? `${s.counterVal} ${s.activeVal}` : `${s.counterVal}`

    return (
        <div className={s.counter}><span className={EndCounterClass}>{count}</span></div>
    );
};