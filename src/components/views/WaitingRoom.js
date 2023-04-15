//import { useHistory } from 'react-router-dom';
import 'styles/views/WaitingRoom.scss';
import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import { Bubble } from 'components/ui/Bubble';
import {format} from "react-string-format";
import io from "socket.io-client";
import {getDomainSocket} from "../../helpers/getDomainSocket";
import {Button} from "../ui/Button";


//this should ofc not be constant, the room code is contained in 'data.getRoom()' but that doesnt work for some reason
const room = '1';


// join the namespace for the room that you joined
// add the url of the backend to make the connection to the server (getDomainSocket returns the URL of the server depending on prod or dev environment)
const url = format(getDomainSocket() + "?room={0}", room);
const socket = io.connect(url,{transports: ['websocket'], upgrade: false, room: room});




const WaitingRoom = (props) => {
    const history = useHistory();
    const data = useLocation();


    console.log("data:", data);



    const startGame = () => {

        console.log("game started");
        socket.emit('start_game',{
            message : "",
            room: room,
            type: "CLIENT"})

        history.push(`/question`);

    }



//used to receive data from the server
    useEffect(async () =>{
        //everytime an event happens triggered by the socket, this function is called


        socket.on("get_message", (data) =>{
            console.log("get message received:")
            console.log(data.message)
        })

    })



    return (
        <div className="waiting-room-wrapper">

            <div className="player-info">
                already joined:
                <div className="player-list">

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
            </div>

            <div className="game-info">
                number of questions:
                <br/>
                question topic:
                <br/>
                game mode:
            </div>

            <div className="exit-button">
                <a href = "/welcomepage"> exit </a>
            </div>
        </div>
    );
};

export default WaitingRoom;
