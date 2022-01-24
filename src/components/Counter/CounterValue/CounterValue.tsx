import React from 'react';
import s from "../Counter.module.css";


type propsType = {
    count: number
    endVal: number
    editableMode: boolean
    errorMode: boolean
}


export const CounterValue = ({errorMode, editableMode, count, endVal}: propsType) => {
    const EndCounterClass = count >= endVal ? `${s.counterVal} ${s.activeVal}` : `${s.counterVal}`

    return (
        <div className={s.counter}>
            {
                editableMode
                    ? <span className={s.editableMode}>enter values and press 'set'</span>
                    : <span className={EndCounterClass}>
                        {errorMode
                            ? `VSE PROPALO`
                            : `${count}`
                        }
                    </span>
            }
        </div>
    );
};