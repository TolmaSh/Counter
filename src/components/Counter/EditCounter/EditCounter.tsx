import React, {ChangeEvent, useEffect, useState} from 'react';
import s from "../Counter.module.css";
import {Button} from "../Button/Button";
import {saveState} from "../../../localStorage/localStorage";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../store/store";
import {
    changeCounterValueAC,
    setMaxValueAC,
    setStartValueAC,
    toggleEditableModeAC,
    toggleErrorModeAC
} from "../../../store/CounterReducer";


export const EditCounter = () => {

    const dispatch = useDispatch()
    const startVal: number = useSelector<RootReducerType, number>(state => state.counter.startValue)
    const endVal: number = useSelector<RootReducerType, number>(state => state.counter.maxValue)
    const errorMode: boolean = useSelector<RootReducerType, boolean>( state => state.counter.error)


    const [maxValue, setMaxValue] = useState(endVal)
    const [startValue, setStartValue] = useState(startVal)

    useEffect(() => {
        editableModeCallback();
    }, [maxValue, startValue])


    const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newMaxValue = +e.currentTarget.value
        if (startValue === newMaxValue || newMaxValue < 0 || newMaxValue < startValue) {
            dispatch(toggleErrorModeAC(true))
        } else {
            dispatch(toggleErrorModeAC(false))
        }
        setMaxValue(newMaxValue)
    }

    const onChangeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStartValue = +e.currentTarget.value
        if (newStartValue === maxValue || newStartValue < 0 || newStartValue > maxValue) {
            dispatch(toggleErrorModeAC(true))
        } else {
            dispatch(toggleErrorModeAC(false))
        }
        setStartValue(newStartValue)
    }

    const onClickHandler = () => {
        dispatch(setStartValueAC(startValue))
        dispatch(setMaxValueAC(maxValue))
        dispatch(changeCounterValueAC(startValue))
        dispatch(toggleEditableModeAC(false))
        saveState('Start Value', startValue);
        saveState('Max Value', maxValue)
    }

    const editableModeCallback = () => {
        if (startValue === startVal && maxValue === endVal) {
            dispatch(toggleEditableModeAC(false))
        } else if (errorMode) {
            dispatch(toggleEditableModeAC(false))
        } else {
            dispatch(toggleEditableModeAC(true))
        }
    }

    const disableSet = maxValue < 0
        || startValue < 0
        || startValue === maxValue
        || maxValue < startValue
        || !(maxValue !== endVal || startValue !== startVal)

    const finalStartValueInputClass = startValue < 0 || startValue >= maxValue ? `${s.error}` : ``;

    const finalMaxValueInputClass = maxValue < 0 || maxValue <= startValue ? `${s.error}` : ``;

    return (
        <div className={s.wrapper}>
            <div className={s.counter}>
                <span className={s.input_name}>max value:
                    <input className={finalMaxValueInputClass} type="number"
                           value={maxValue}
                           onChange={onChangeMaxValueHandler}/>
                </span>
                <span className={s.input_name}>start value:
                    <input className={finalStartValueInputClass} type="number"
                           value={startValue}
                           onChange={onChangeStartValueHandler}/>
                </span>
            </div>
            <div className={s.btnList}>
                <Button
                    onClick={onClickHandler}
                    btnName={"Set"}
                    disabledBtn={disableSet}
                />
            </div>
        </div>
    );
};
