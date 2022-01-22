import React, {useState} from 'react';
import s from "./Counter.module.css"
import {Button} from "./Button/Button";
import {CounterValue} from "./CounterValue/CounterValue";


export const Counter = () => {


    const [startVal, setStartVal] = useState<number>(0)
    const [endVal, setEndVal] = useState<number>(5)
    const [count, setCount] = useState<number>(startVal)

    const addCountHandler = () => {
        if (count <= endVal) {
            setCount(count + 1)
        }
    }
    const resetCounterHandler = () => {
        setCount(startVal)
    }

    const disabledAdd = count >= endVal
    const disabledReset = count <= startVal

    return (
        <>
            <div className={s.wrapper}>
                <CounterValue
                    count={count}
                    endVal={endVal}
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
            <div className={s.wrapper}>
                <div className={s.counter}>
                    <div><span>Max Value: <input type="number" value={endVal}/></span></div>
                    <div><span>Start Value: <input type="number" value={startVal}/></span></div>
                </div>
                <div className={s.btnList}>
                    <Button
                        onClick={addCountHandler}
                        btnName={"Set"}
                        disabledBtn={disabledAdd}
                    />
                </div>
            </div>
        </>
    );
};
