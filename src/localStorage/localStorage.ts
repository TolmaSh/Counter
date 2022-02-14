
import {RootReducerType} from "../store/store";

export function saveState<T>(key: string, state: T) {
    const stateAsString = JSON.stringify(state)
    localStorage.setItem(key, stateAsString)
}

// export function restoreState<T>(key: string, defaultState: T) {
//     let state = defaultState
//     const stateAsString = localStorage.getItem(key)
//
//     if (stateAsString !== null) {
//         state = JSON.parse(stateAsString) as T
//     }
//
//     return state
// }

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('CounterState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveStateStore = (state: RootReducerType) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('CounterState', serializedState);
    } catch {
        // ignore write errors
    }
};