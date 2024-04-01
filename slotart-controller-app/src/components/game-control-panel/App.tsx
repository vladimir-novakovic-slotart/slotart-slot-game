// GameControlPanel.tsx
import React from 'react';
import './App.css';
import {useGameActionsDispatcher} from "../../GameActionsDIspatcher";
import Button from "./Button";
import { useDispatch } from 'react-redux';


interface GameControlPanelProps {
    dispatch: any;
}

const GameControlPanel: React.FC<GameControlPanelProps> = ({ dispatch }) => {
    const { handleSettingsClick, handleSoundClick, handleInfoClick, handleSpinClick } = useGameActionsDispatcher();

    return (
        <div id="App">
            <div className="game-control-panel">
                <Button size="medium" onClick={handleSettingsClick}>
                    Settings
                </Button>
                <Button size="medium" onClick={handleSoundClick}>
                    Sound
                </Button>
            </div>
            <div className="bottom-control-bar">
                <div className="control-group-start">
                    <div className="control-group">
                        <Button size="small" onClick={handleSettingsClick}>
                            Settings
                        </Button>
                        <Button size="small" onClick={handleSoundClick}>
                            Sound
                        </Button>
                    </div>
                    <Button size="medium" onClick={handleInfoClick}>
                        Info
                    </Button>
                    <div className="control-label">
                        <p>Credit: 100</p>
                        <p>Bet: 1</p>
                    </div>
                </div>
                <div className="text">
                    <p>PLACE YOUR BETS!</p>
                </div>
                <Button size="xlarge" onClick={handleSpinClick}>
                    Spin
                </Button>
            </div>
        </div>
    );
}

export default GameControlPanel;