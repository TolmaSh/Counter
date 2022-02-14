import {combineReducers, createStore} from "redux";
import {loadState, saveStateStore} from "../localStorage/localStorage";
import {CounterReducer} from "./CounterReducer";

const rootReducer = combineReducers({
    counter: CounterReducer
})
export type RootReducerType = ReturnType<typeof rootReducer>


const persistedState = loadState();
export const store = createStore(rootReducer,persistedState)

store.subscribe(() => {
    saveStateStore({
        counter: store.getState().counter
    });
});