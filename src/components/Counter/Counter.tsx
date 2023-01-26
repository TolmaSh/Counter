import React from 'react';
import s from './Counter.module.css'
import {Button} from './Button/Button';
import {CounterValue} from './CounterValue/CounterValue';
import {useDispatch, useSelector} from 'react-redux';
import {RootReducerType} from '../../store/store';
import {
    addCounterValueAC,
    changeCounterValueAC,
    resetCounterAC,
    setMaxValueAC,
    setStartValueAC, toggleEditableModeAC, toggleErrorModeAC
} from '../../store/CounterReducer';
import {EditCounter} from './EditCounter/EditCounter';
import {saveState} from '../../localStorage/localStorage';

export const Counter = () => {

    const dispatch = useDispatch()
    const value: number = useSelector<RootReducerType, number>(state => state.counter.value)
    const startValue: number = useSelector<RootReducerType, number>(state => state.counter.startValue)
    const maxValue: number = useSelector<RootReducerType, number>(state => state.counter.maxValue)
    const editableMode: boolean = useSelector<RootReducerType, boolean>(state => state.counter.editable)
    const errorMode: boolean = useSelector<RootReducerType, boolean>(state => state.counter.error)


    const addCountHandler = () => {
        if (value <= maxValue) {
            dispatch(addCounterValueAC())
        }
    }
    const resetCounterHandler = () => {
        dispatch(resetCounterAC(startValue))
    }
    const setCounterHandler = () => {
        dispatch(setStartValueAC(startValue))
        dispatch(setMaxValueAC(maxValue))
        dispatch(changeCounterValueAC(startValue))
        dispatch(toggleEditableModeAC(false))
        saveState('Start Value', startValue);
        saveState('Max Value', maxValue)
    }
    const changeMaxValue = (value: number) => {
        if (startValue === value || value < 0 || value < startValue) {
            dispatch(toggleErrorModeAC(true))
        } else {
            dispatch(toggleErrorModeAC(false))
        }
        dispatch(setMaxValueAC(value))
        changeEditableMode()
    }
    const changeStartValue = (value: number) => {
        if (value === maxValue || value < 0 || value > maxValue) {
            dispatch(toggleErrorModeAC(true))
        } else {
            dispatch(toggleErrorModeAC(false))
        }
        dispatch(setStartValueAC(value))
        changeEditableMode()
    }
    const changeEditableMode = () => {
        if (errorMode) {
            dispatch(toggleEditableModeAC(false))
        } else {
            dispatch(toggleEditableModeAC(true))
        }
    }

    const disabledAdd = value >= maxValue || editableMode
    const disabledReset = value <= startValue || editableMode
    const disableSet = maxValue < 0 || startValue < 0 || startValue === maxValue || maxValue < startValue

    return (
        <>
            <div className={s.wrapper}>
                <CounterValue maxValue={maxValue} value={value} errorMode={errorMode} editableMode={editableMode}/>
                <div className={s.btnList}>
                    <Button
                        onClick={addCountHandler}
                        btnName={'Add'}
                        disabledBtn={disabledAdd}
                    />
                    <Button
                        onClick={resetCounterHandler}
                        btnName={'Reset'}
                        disabledBtn={disabledReset}
                    />
                </div>
            </div>
            <div className={s.wrapper}>
                <EditCounter changeStartValue={changeStartValue}
                             maxValue={maxValue}
                             startValue={startValue}
                             changeMaxValue={changeMaxValue}
                />
                <div className={s.btnList}>
                    <Button
                        onClick={setCounterHandler}
                        btnName={'Set'}
                        disabledBtn={disableSet}
                    />
                </div>
            </div>
        </>
    );
};
