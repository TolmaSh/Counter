import React, {useEffect, useState} from 'react';
import s from "./Counter.module.css"
import {Button} from "./Button/Button";
import {CounterValue} from "./CounterValue/CounterValue";
import {EditCounter} from "./EditCounter/EditCounter";
import {restoreState, saveState} from "../../localStorage/localStorage";

export const Counter = () => {
    const [startVal, setStartVal] = useState(0)
    const [endVal, setEndVal] = useState(5)
    const [count, setCount] = useState(startVal)
    const [editableMode, setEditableMode] = useState(false)
    const [errorMode, setErrorMode] = useState(false)

    useEffect(() => {
        const defaultStartValue = restoreState('Start Value', 0);

        setStartVal(defaultStartValue);
        setEndVal(restoreState('Max Value', 5))
        setCount(restoreState('Counter Value', defaultStartValue))
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
