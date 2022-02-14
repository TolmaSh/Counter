import React from 'react';
import s from "../Counter.module.css";
import {useSelector} from "react-redux";
import {RootReducerType} from "../../../store/store";




export const CounterValue = () => {
    const CounterValue: number = useSelector<RootReducerType, number>( state => state.counter.value)
    const ErrorMode: boolean = useSelector<RootReducerType, boolean>(state => state.counter.error)
    const EditableMode: boolean = useSelector<RootReducerType, boolean>(state => state.counter.editable)
    const MaxValue: number = useSelector<RootReducerType, number>( state => state.counter.maxValue)

    const EndCounterClass = CounterValue >= MaxValue ? `${s.counterVal} ${s.activeVal}` : `${s.counterVal}`

    return (
        <div className={s.counter}>
            {
                EditableMode
                    ? <span className={s.editableMode}>enter values and press 'set'</span>
                    : <span className={EndCounterClass}>
                        {ErrorMode
                            ? `VSE PROPALO`
                            : `${CounterValue}`
                        }
                    </span>
            }
        </div>
    );
};