export type initialStateType = {
    value: number
    startValue: number
    maxValue: number
    editable: boolean
    error: boolean
}

const initialState = {
    value: 0,
    startValue: 0,
    maxValue: 5,
    editable: false,
    error: false,
}


export const CounterReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'RESET-COUNTER':
        case 'CHANGE-VALUE':
        case 'SET-MAX-VALUE':
        case 'SET-START-VALUE':
        case 'TOGGLE-EDITABLE':
        case 'TOGGLE-ERROR': {
            return {...state, ...action.payload}
        }

        default:
            return state
    }
}

type ActionType = ResetCounterActionType
    | ToggleEditableModeActionType
    | ToggleErrorModeActionType
    | setStartValueActionType
    | setMaxValueActionType
    | changeCounterValueActionType

type changeCounterValueActionType = ReturnType<typeof changeCounterValueAC>
export const changeCounterValueAC = (value: number) => {
    return {
        type: 'CHANGE-VALUE',
        payload: {value}
    } as const
}

type ResetCounterActionType = ReturnType<typeof resetCounterAC>
export const resetCounterAC = (startValue: number) => {
    return {
        type: 'RESET-COUNTER',
        payload: {value: startValue}
    } as const
}

type ToggleEditableModeActionType = ReturnType<typeof toggleEditableModeAC>
export const toggleEditableModeAC = (editable: boolean) => {
    return {
        type: 'TOGGLE-EDITABLE',
        payload: {editable}
    } as const
}

type ToggleErrorModeActionType = ReturnType<typeof toggleErrorModeAC>
export const toggleErrorModeAC = (error: boolean) => {
    return {
        type: 'TOGGLE-ERROR',
        payload: {error}
    } as const
}

type setStartValueActionType = ReturnType<typeof setStartValueAC>
export const setStartValueAC = (startValue: number) => {
    return {
        type: 'SET-START-VALUE',
        payload: {startValue}
    } as const
}

type setMaxValueActionType = ReturnType<typeof setMaxValueAC>
export const setMaxValueAC = (maxValue: number) => {
    return {
        type: 'SET-MAX-VALUE',
        payload: {maxValue}
    } as const
}