import React from "react";
import "./App.css";
import { createDefaultGame } from 'slotart-game-librarry';
import { GameControlPanel } from 'slotart-controller-app';

class App extends React.Component {
    componentDidMount() {
        createDefaultGame("theGame");
    }

    render() {
        return (
            <div className="App">
                    <div id="theGame">
                        <GameControlPanel>
                    </GameControlPanel></div>
            </div>
        );
    }
}

export default App;
