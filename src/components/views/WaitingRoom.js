//import { useHistory } from 'react-router-dom';
import 'styles/views/WaitingRoom.scss';
import BaseContainer from "components/ui/BaseContainer";
import React, { useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import {useHistory } from 'react-router-dom';
import { Bubble } from 'components/ui/Bubble';
import { Link } from 'react-router-dom';
import SettingsContainer from 'components/ui/SettingsContainer';
import RadioButtons from 'components/ui/RadioButtons';
import Select from 'components/ui/Select';
import BackIcon from 'components/ui/BackIcon';
import {api, headers, handleError} from 'helpers/api';



const WaitingRoom = (props) => {
    const history = useHistory();
    const data = useLocation();
    //const [reducerState, dispatch] = useReducer();
    console.log("data:", data);

    const nrOfQuestions = data.questionTopic;
    console.log("nrOfQuestions:", nrOfQuestions);
    console.log("KEY", Object.keys(data));
    console.log("HERE", data.state.questionTopic);
    //const so that only leader can start game, does nothing usefull yet
    const startGame = () => {
    }

    const exitGame = () => {
        history.push(`/welcomepage`);
    }

    const roomcode = () => {
    }

    // const topic = async () => {
    //     try {
    //         const requestBody = JSON.stringify();
    //         const response = await api.get('/gameroom', requestBody);
    //         console.log(response.data);
    //         console.log("Hello");
    // } catch (error) {

    //     //alert(`Something went wrong during the login: \n${handleError(error)}`);
    //     //setError(error.response.data.message);
    //   }
    // };

        const topic =  () => {
            //data.questionTopic

    };



    return (
        <div className="waiting-room-wrapper">

            <div className="player-info">
                already joined:
            </div>

            <div className="bubble-item">
                <div className = "bubble-container">
                    <Bubble onClick={startGame} className="bubble-button--waitingroom">Wait for players: Press to start!</Bubble>
                </div>
            </div>
        
            <div className="room-code">
                room code: 
                <br/>
                {data.state.roomCode}
            </div>

            <div className="game-info">
                number of questions: {data.state.numOfQuestions}
                <br/>
                question topic: {data.state.questionTopic}
                <br/>
                game mode: {data.state.gameMode}
            </div>

            <div className="exit-button">
                <Link onClick={exitGame} >exit</Link>
            </div>
        </div>
    );
};

export default WaitingRoom;
