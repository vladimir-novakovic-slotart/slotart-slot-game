import React, { Component, ChangeEvent } from "react";
import "./App.css";
import spinIcon from './spin2.svg';
import infoIcon from './info2.svg';
import soundIcon from './sound1.svg';
import settingsIcon from './settings1.svg';

interface State {
    credit: number;
    bet: number;
}

class GameControlPanel extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            credit: 100,
            bet: 1
        };
    }

    handleSpin = () => {
        // Logika za obradu klika na dugme "Spin"
    };

    handleCreditChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ credit: parseInt(event.target.value) });
    };

    handleBetChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ bet: parseInt(event.target.value) });
    };

    render() {
        const { credit, bet } = this.state;

        return (
            <div id="App">
                <div className="game-control-panel"></div>
                <div className="bottom-control-bar">
                    <div className="control-group-start">
                        <div className="control-group">
                            <button className="control-button settings">
                                <img src={settingsIcon} alt="Settings" />
                            </button>
                            <button className="control-button sound">
                                <img src={soundIcon} alt="Sound" />
                            </button>
                        </div>
                        <button className="control-button info">
                            <img src={infoIcon} alt="Info" />
                        </button>
                        <div className="control-label">
                            <p>Credit: {credit}</p>
                            <p>Bet: {bet}</p>
                        </div>
                    </div>
                    <div className="text">
                        <p>PLACE YOUR BETS!</p>
                    </div>
                    <button className="control-button-spin spin spin-button" onClick={this.handleSpin}>
                        <img src={spinIcon} alt="Spin" />
                    </button>
                </div>
            </div>
        );
    }
}

export default GameControlPanel;
