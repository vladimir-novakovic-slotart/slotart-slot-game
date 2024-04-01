import React, { useEffect } from "react";
import "./App.css";
import { createDefaultGame } from "slotart-game-librarry";
import { GameControlPanel } from "slotart-controller-app";
import { useDispatch } from 'react-redux';

const App: React.FC = () => {
    const dispatch = useDispatch(); //

    useEffect(() => {
        createDefaultGame("theGame");
    }, []);

    return (
        <div className="App">
            <div id="theGame">
                <GameControlPanel dispatch={dispatch}/>
            </div>
        </div>
    );
}

export default App;
