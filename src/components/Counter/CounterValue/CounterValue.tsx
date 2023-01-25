import React, {FC} from 'react';
import s from '../Counter.module.css';


type PropsType = {
    maxValue: number
    value: number
    errorMode: boolean
    editableMode: boolean
}

export const CounterValue: FC<PropsType> = (props) => {
    const {value, maxValue, errorMode, editableMode} = props

    const EndCounterClass = value >= maxValue ? `${s.counterVal} ${s.activeVal}` : `${s.counterVal}`;

    return (
        <div className={s.counter}>
            { editableMode ? <span className={s.editableMode}>enter values and press 'set'</span>
                           : <span className={EndCounterClass}> {errorMode ? `VSE PROPALO` : `${value}`} </span>
            }
        </div>
    );
};