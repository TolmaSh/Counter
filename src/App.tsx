import React from 'react';
import './App.css';
import {Counter} from "./components/Counter/Counter";
import {EditCounter} from "./components/Counter/EditCounter/EditCounter";

function App() {
    return (
        <div className="App">
            <Counter/>
            <EditCounter/>
        </div>
    );
}

export default App;
