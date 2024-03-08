import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createDefaultGame } from 'slotart-game-librarry';
// import { GameControlPanel } from 'slotart-controller-app';
import { helloWorld } from 'slotart-controller-app';

class App extends React.Component<any, any> {
  componentDidMount() {
    helloWorld("Vladimir");
    createDefaultGame("theGame");
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <div id="theGame"></div>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            {/*<GameControlPanel></GameControlPanel>*/}
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
    );
  }
}

export default App;
