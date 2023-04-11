import React from 'react';
//import { useHistory } from 'react-router-dom';
import 'styles/views/WaitingRoom.scss';
import BaseContainer from "components/ui/BaseContainer";

import { useLocation } from 'react-router-dom';

import { Bubble } from 'components/ui/Bubble';
import SettingsContainer from 'components/ui/SettingsContainer';
import RadioButtons from 'components/ui/RadioButtons';
import Select from 'components/ui/Select';
import BackIcon from 'components/ui/BackIcon';



const WaitingRoom = (props) => {
    //const history = useHistory();
    const data = useLocation();
    console.log("data:", data);

    
    //const so that only leader can start game, does nothing usefull yet
    const startGame = () => {
    }

    return (
        <div className="waiting-rom-wrapper">
            <div className="bubble-item">
            <Bubble onClick={startGame} className="bubble-button--waitingroom">Wait for players: Press to start!</Bubble>
            </div>
        
            <div className="room-code">
                room code: 
            </div>

            <div className="game-info">
                number of questions:
                question topic:
                game mode:
            </div>

            <div className="player-info">
                already joined:
            </div>

            <div className="exit-button">
                exit
            </div>

        </div>
    );
};

export default WaitingRoom;
