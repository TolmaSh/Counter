import React, {useState} from 'react';
import s from "./Counter.module.css"
import {Button} from "./Button/Button";
import {CounterValue} from "./CounterValue/CounterValue";
import {EditCounter} from "./EditCounter/EditCounter";


export const Counter = () => {


    const [startVal, setStartVal] = useState<number>(0)
    const [endVal, setEndVal] = useState<number>(5)
    const [count, setCount] = useState<number>(startVal)
    const [editableMode, setEditableMode] = useState<boolean>(false)

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

     const onEditableMode = (val: boolean) => {
        setEditableMode(val)
     }
    const setNewValue = (sVal: number,eVal: number) => {
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
            onEditableMode={onEditableMode}
            />
        </>
    );
};
