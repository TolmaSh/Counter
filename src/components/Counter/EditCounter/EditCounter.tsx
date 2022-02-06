import React, {ChangeEvent, useEffect, useState} from 'react';
import s from "../Counter.module.css";
import {Button} from "../Button/Button";
import {restoreState, saveState} from "../../../localStorage/localStorage";

type EditCounterPropsType = {
    startVal: number
    endVal: number
    onClickCallback: (sVal: number, eVal: number) => void
    toggleEditableMode: (val: boolean) => void
    toggleErrorMode: (val: boolean) => void
    errorMode: boolean
}

export const EditCounter = ({
                                errorMode,
                                toggleErrorMode,
                                toggleEditableMode,
                                onClickCallback,
                                startVal,
                                endVal
                            }: EditCounterPropsType) => {
    const [maxValue, setMaxValue] = useState(5)
    const [startValue, setStartValue] = useState(0)
    useEffect(() => {
        editableModeCallback();
    })
    useEffect(() => {
        setStartValue(restoreState('Start Value', 0));
        setMaxValue(restoreState('Max Value', 5))
    }, [])
    const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newMaxValue = +e.currentTarget.value

        if (startValue === newMaxValue || newMaxValue < 0 || newMaxValue < startValue) {
            toggleErrorMode(true)
        } else {
            toggleErrorMode(false)
        }

        setMaxValue(newMaxValue)
    }
    const onChangeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStartValue = +e.currentTarget.value

        if (newStartValue === maxValue || newStartValue < 0 || newStartValue > maxValue) {
            toggleErrorMode(true)
        } else {
            toggleErrorMode(false)
        }
        setStartValue(newStartValue)

    }

    const onClickHandler = () => {
        onClickCallback(startValue, maxValue)
        saveState('Start Value', startValue);
        saveState('Max Value', maxValue)
    }

    const editableModeCallback = () => {
        if (startValue === startVal && maxValue === endVal) {
            toggleEditableMode(false)
        } else if (errorMode) {
            toggleEditableMode(false)
        } else {
            toggleEditableMode(true)
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
