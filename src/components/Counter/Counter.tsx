import React, {useEffect, useState} from 'react';
import s from "./Counter.module.css"
import {Button} from "./Button/Button";
import {CounterValue} from "./CounterValue/CounterValue";
import {EditCounter} from "./EditCounter/EditCounter";
import {restoreState, saveState} from "../../localStorage/localStorage";


export const Counter = () => {


    const [startVal, setStartVal] = useState<number>(0)
    const [endVal, setEndVal] = useState<number>(5)
    const [count, setCount] = useState<number>(startVal)
    const [editableMode, setEditableMode] = useState<boolean>(false)
    const [errorMode, setErrorMode] = useState<boolean>(false)

    useEffect(() => {
        setStartVal(restoreState('Start Value', 0));
        setEndVal(restoreState('Max Value', 5))
        setCount(restoreState('Counter Value', startVal))

    }, [])
    useEffect(() => {
        saveState('Counter Value', count);
    }, [count])
    const addCountHandler = () => {
        if (count <= endVal) {
            setCount(count + 1)
        }
    }
    const resetCounterHandler = () => {
        setCount(startVal)
    }

    const disabledAdd = count >= endVal || editableMode
    const disabledReset = count <= startVal || editableMode

    const toggleEditableMode = (val: boolean) => {
        setEditableMode(val)
    }
    const toggleErrorMode = (val: boolean) => {
        setErrorMode(val)
    }
    const setNewValue = (sVal: number, eVal: number) => {
        setStartVal(sVal)
        setEndVal(eVal)
        setCount(sVal)
        setEditableMode(false)
    }

    return (
        <>
            <div className={s.wrapper}>
                <CounterValue
                    count={count}
                    endVal={endVal}
                    editableMode={editableMode}
                    errorMode={errorMode}
                />
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
            <EditCounter
                startVal={startVal}
                endVal={endVal}
                onClickCallback={setNewValue}
                toggleEditableMode={toggleEditableMode}
                toggleErrorMode={toggleErrorMode}
                errorMode={errorMode}

            />
        </>
    );
};
