import React, {ChangeEvent, FC} from 'react';
import s from '../Counter.module.css';

type PropsType = {
    maxValue: number
    startValue: number
    changeMaxValue: (value: number) => void
    changeStartValue: (value: number) => void
}

export const EditCounter: FC<PropsType> = (props) => {
    const {maxValue,startValue,changeMaxValue,changeStartValue} = props
    const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeMaxValue(+e.currentTarget.value)
    }
    const onChangeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeStartValue(+e.currentTarget.value)
    }


    const finalStartValueInputClass = startValue < 0 || startValue >= maxValue ? `${s.error}` : ``;
    const finalMaxValueInputClass = maxValue < 0 || maxValue <= startValue ? `${s.error}` : ``;

    return (
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
    );
};
