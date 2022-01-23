import React, {ChangeEvent, useState} from 'react';
import s from "../Counter.module.css";
import {Button} from "../Button/Button";

type EditCounterPropsType = {
    startVal: number
    endVal: number
    onClickCallback: (sVal: number, eVal: number) => void
    onEditableMode: (val: boolean) => void
}

export const EditCounter = ({onEditableMode,onClickCallback, startVal, endVal}: EditCounterPropsType) => {
    const [maxValue, setMaxValue] = useState(endVal)
    const [startValue, setStartValue] = useState(startVal)

    const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        debugger
        setMaxValue(+e.currentTarget.value)

    }
    const onChangeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setStartValue(+e.currentTarget.value)
    }
    const onClickHandler = () => {
        onClickCallback(startValue, maxValue)
    }
    const  editableModeCallback = () => {
        if ( startValue === startVal && maxValue === endVal) {
            onEditableMode(false)
        } else {
            onEditableMode(true)
        }
    }
    editableModeCallback()
    const disableSet = maxValue < 0 || startValue < 0 || startValue === maxValue || maxValue < startValue || !(maxValue !== endVal || startValue !== startVal)
    const finalStartValueInputClass = startValue < 0 || startValue >= maxValue ? `${s.error}` : ``;
    const finalMaxValueInputClass = maxValue < 0 || maxValue <= startValue  ? `${s.error}` : ``;
    return (
        <div className={s.wrapper}>
            <div className={s.counter}>
                <span>Max Value: <input className={finalMaxValueInputClass} type="number" value={maxValue}
                                        onChange={onChangeMaxValueHandler}/></span>
                <span>Start Value: <input className={finalStartValueInputClass} type="number" value={startValue}
                                          onChange={onChangeStartValueHandler}/></span>
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
