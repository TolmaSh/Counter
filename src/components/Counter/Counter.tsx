import React from 'react';
import s from "./Counter.module.css"
import {Button} from "./Button/Button";
import {CounterValue} from "./CounterValue/CounterValue";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../store/store";
import {addCounterValueAC, resetCounterAC} from "../../store/CounterReducer";

export const Counter = () => {

    const dispatch = useDispatch()
    const value: number = useSelector<RootReducerType, number>( state => state.counter.value)
    const startValue: number = useSelector<RootReducerType, number>( state => state.counter.startValue)
    const maxValue: number = useSelector<RootReducerType, number>( state => state.counter.maxValue)
    const editableMode: boolean = useSelector<RootReducerType, boolean>(state => state.counter.editable)

    const addCountHandler = () => {
        if (value <= maxValue) {
            dispatch(addCounterValueAC())
        }
    }
    const resetCounterHandler = () => {
        dispatch(resetCounterAC(startValue))
    }

    const disabledAdd = value >= maxValue || editableMode
    const disabledReset = value <= startValue || editableMode

    return (
            <div className={s.wrapper}>
                <CounterValue/>
                <div className={s.btnList}>
                    <Button
                        onClick={addCountHandler}
                        btnName={"Add"}
                        disabledBtn={disabledAdd}
                    />
                    <Button
                        onClick={resetCounterHandler}
                        btnName={"Reset"}
                        disabledBtn={disabledReset}
                    />
                </div>
            </div>
    );
};
