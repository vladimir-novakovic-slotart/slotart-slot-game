import React from "react";
import "./App.css";


class GameControlPanel extends React.Component {
  render() {
    return (
        <div className="game-contol-panel">
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
        </div>
    );
  }
}

export default GameControlPanel;