// App.tsx
import React from "react";
import "./App.css";
import Button from "./Button";
import spinIcon from "./spin.png";
import infoIcon from "./info.png";
import soundIcon from "./sound.svg";
import settingsIcon from "./settings.svg";

interface State {
    credit: number;
    bet: number;
}

class GameControlPanel extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            credit: 100,
            bet: 1,
        };
    }

    handleSpin = () => {
        // Logika za obradu klika na dugme "Spin"
    };

    handleCreditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ credit: parseInt(event.target.value) });
    };

    handleBetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ bet: parseInt(event.target.value) });
    };

    render() {
        const { credit, bet } = this.state;

        return (
            <div id="App">
                <div className="game-control-panel">
                    <Button size="medium" onClick={() => console.log("Settings clicked")}>
                        <img src={settingsIcon} alt="Settings" className="icon" />
                    </Button>
                    <Button size="medium" onClick={() => console.log("Sound clicked")}>
                        <img src={soundIcon} alt="Sound" className="icon" />
                    </Button>
                </div>
                <div className="bottom-control-bar">
                    <div className="control-group-start">
                        <div className="control-group">
                            <Button size="small" onClick={() => console.log("Settings clicked")}>
                                <img src={settingsIcon} alt="Settings" className="icon" />
                            </Button>
                            <Button size="small" onClick={() => console.log("Sound clicked")}>
                                <img src={soundIcon} alt="Sound" className="icon" />
                            </Button>
                        </div>
                        <Button size="medium" onClick={() => console.log("Info clicked")}>
                            <img src={infoIcon} alt="Info" className="icon" />
                        </Button>
                        <div className="control-label">
                            <p>Credit: {credit}</p>
                            <p>Bet: {bet}</p>
                        </div>
                    </div>
                    <div className="text">
                        <p>PLACE YOUR BETS!</p>
                    </div>
                    <Button size="xlarge" onClick={this.handleSpin}>
                        <img src={spinIcon} alt="Spin" className="spin-button" />
                    </Button>
                </div>
            </div>
        );
    }
}

export default GameControlPanel;
