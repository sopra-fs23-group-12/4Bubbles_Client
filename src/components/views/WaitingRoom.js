//import { useHistory } from 'react-router-dom';
import 'styles/views/WaitingRoom.scss';
import React, { } from 'react';
import { useLocation } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import { Bubble } from 'components/ui/Bubble';




const WaitingRoom = (props) => {
    const history = useHistory();
    const data = useLocation();
    console.log("data:", data);

    const startGame = () => {
        history.push(`/question`);
    }

    return (
        <div className="waiting-room-wrapper">

            <div className="player-info">
                already joined:
                <div className="player-list">
                    {data.state.members.map((member) => {
                        return (
                            <div className="player">{member.username}</div>
                    )})}
                </div>
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
                <a href = "/welcomepage"> exit </a>
            </div>
        </div>
    );
};

export default WaitingRoom;
