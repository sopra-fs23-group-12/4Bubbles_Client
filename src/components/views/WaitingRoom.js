import 'styles/views/WaitingRoom.scss';
import React, {useEffect, useMemo, useState} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Bubble } from 'components/ui/Bubble';
import {format} from "react-string-format";
import io from "socket.io-client";
import {getDomainSocket} from "../../helpers/getDomainSocket";
import {Button} from "../ui/Button";



const WaitingRoom = (props) => {
    const history = useHistory();
    const data = useLocation();
    const [members, setMembers] = useState(data.state.members)
    console.log("data:", data);


//this should ofc not be constant, the room code is contained in 'data.getRoom()' but that doesnt work for some reason
    const roomCode = data.state.roomCode
    const userId = localStorage.getItem("userId");
    const bearerToken = localStorage.getItem("token");

// join the namespace for the room that you joined
// add the url of the backend to make the connection to the server (getDomainSocket returns the URL of the server depending on prod or dev environment)
    const url = format(getDomainSocket() + "?roomCode={0}", roomCode);
    const socket = useMemo(() => io.connect(url, { transports: ['websocket'], upgrade: false, roomCode: roomCode }), []);

    console.log("socket request sent to:", roomCode)


    const startGame = () => {

        console.log("game started");
        socket.emit('start_game',{
            message : "",
            roomCode: roomCode,
            type: "CLIENT"})

        history.push(`/question`);
    }

    //used to receive data from the server
    useEffect(async () =>{
        //everytime an event happens triggered by the socket, this function is called


        socket.on("get_message", (incomingData) =>{
            console.log("get message received:")
            console.log(incomingData.message)
        })

        //returns a list of members since that is the only thing in the state that changes
        socket.on("new_player_joined", (incomingData) => {
            console.log("new_player_joined")
            console.log(data);
            console.log(incomingData);
            setMembers(incomingData);
            //TODO; it seems that the action actually takes place, but the member list is not rerendered
        })

    })

    return (
        <div className="waiting-room-wrapper">

            <div className="player-info">
                already joined:
                <div className="player-list">
                    {members.map((member) => {
                        return (
                            <div key={member.username} className="player">{member.username}</div>
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
