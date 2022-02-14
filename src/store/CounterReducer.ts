

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
        case "ADD-VALUE": {
            return {...state, value: state.value + 1}
        }
        case "RESET-COUNTER": {
            return {...state, value: action.payload.startValue}
        }
        case "CHANGE-VALUE": {
            return {...state, value: action.payload.newValue}
        }
        case "SET-START-VALUE": {
            return {...state, startValue: action.payload.newStartValue}
        }
        case "SET-MAX-VALUE": {
            return {...state, maxValue: action.payload.newMaxValue}
        }
        case "TOGGLE-EDITABLE": {
            return {...state, editable: action.payload.value}
        }
        case "TOGGLE-ERROR": {
            return {...state, error: action.payload.value}
        }
        default:
            return state
    }
}

type ActionType = AddCounterValueActionType
    | ResetCounterActionType
    | ToggleEditableModeActionType
    | ToggleErrorModeActionType
    | setStartValueActionType
    | setMaxValueActionType
    | changeCounterValueActionType

type changeCounterValueActionType = ReturnType<typeof changeCounterValueAC>
export const changeCounterValueAC = (newValue: number) => {
    return {
        type: 'CHANGE-VALUE',
        payload: {newValue}
    } as const
}

type AddCounterValueActionType = ReturnType<typeof addCounterValueAC>
export const addCounterValueAC = () => {
    return {
        type: 'ADD-VALUE'
    } as const
}

type ResetCounterActionType = ReturnType<typeof resetCounterAC>
export const resetCounterAC = (startValue: number) => {
    return {
        type: 'RESET-COUNTER',
        payload: {startValue}
    } as const
}

type ToggleEditableModeActionType = ReturnType<typeof toggleEditableModeAC>
export const toggleEditableModeAC = (value: boolean) => {
    return {
        type: 'TOGGLE-EDITABLE',
        payload: {value}
    } as const
}

type ToggleErrorModeActionType = ReturnType<typeof toggleErrorModeAC>
export const toggleErrorModeAC = (value: boolean) => {
    return {
        type: 'TOGGLE-ERROR',
        payload: {value}
    } as const
}

type setStartValueActionType = ReturnType<typeof setStartValueAC>
export const setStartValueAC = (newStartValue: number) => {
    return {
        type: 'SET-START-VALUE',
        payload: {newStartValue}
    } as const
}

type setMaxValueActionType = ReturnType<typeof setMaxValueAC>
export const setMaxValueAC = (newMaxValue: number) => {
    return {
        type: 'SET-MAX-VALUE',
        payload: {newMaxValue}
    } as const
}