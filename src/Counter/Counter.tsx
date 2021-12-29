import React, {useState} from 'react';
import s from "./Counter.module.css"
import {Button} from "./Button/Button";
import {CounterValue} from "./CounterValue/CounterValue";


export const Counter = () => {

    const startVal = 0;
    const endVal = 5;

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
    );
};
