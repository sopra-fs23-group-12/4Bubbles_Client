import 'styles/views/WaitingRoom.scss';
import React, { useState, useEffect, } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Bubble } from 'components/ui/Bubble';
import { format } from "react-string-format";
import { getDomainSocket } from "../../helpers/getDomainSocket";

import { useSocket } from 'components/context/socket';
import PopUpAlert from 'components/ui/PopUp';

// establish a websocket connection (joins namespace for only the sender client)

const WaitingRoom = (props) => {
    const history = useHistory();
    const data = useLocation();

    const { socket, connect } = useSocket();


    if(data.state === undefined) {
        data.state = JSON.parse(localStorage.getItem('dataState'));
        socket.emit('join_room', {
            userId: localStorage.getItem('userId'),
            bearerToken: localStorage.getItem('token'),
            roomCode: data.state.roomCode,
            type: "CLIENT"
          })
    }

    const [members, setMembers] = useState(data.state.members)

    localStorage.setItem('users', JSON.stringify(data.state.members));
    localStorage.setItem('numberOfPlayers', data.state.members.length);
    localStorage.setItem('dataState', JSON.stringify(data.state));


    // join websocket connection again, since there was a disconnect when the push to /waitingroom happened
    const roomCode = localStorage.getItem("roomCode");
    const url = format(getDomainSocket() + "?roomCode={0}", roomCode);
    connect(url, { transports: ['websocket'], upgrade: false, roomCode: roomCode })



    const startGame = async () => {
        // console.log("socket acknowledged as connected pressing start:", socket.connected);
        // add a condition that only the leader can click this
        socket.emit('start_game', {
            message: "",
            roomCode: roomCode,
            type: "CLIENT"
        })
        history.push(`/question`);
    }

    useEffect(() => {
        //infos coming from backend
        //returns a list of members since that is the only thing in the state that changes

        socket.on("joined_players", (incomingData) => {
            setMembers(incomingData);
            data.state.members = incomingData;
            localStorage.setItem('users', JSON.stringify(incomingData));
        })

        socket.on("game_started", (incomingData) => {
            console.log("game_started received:" + incomingData);
            let data = incomingData.toString();
            localStorage.setItem('gameMode', data);

            history.push(`/question`);
        })

        socket.on("get_question", (incomingData) => {
            history.push(`/question`);
        })


        window.addEventListener('popstate', leaveWaitingRoom);
        window.addEventListener('beforeunload', leaveWaitingRoom);

        return () => {
            window.removeEventListener('popstate', leaveWaitingRoom);
            window.removeEventListener('beforeunload', leaveWaitingRoom);

        };
    }, [socket])

    const leaveWaitingRoom = () => {
        socket.emit('user_left_gameroom', {
            message: localStorage.getItem('userId'),
            roomCode: roomCode,
            type: "CLIENT"
        });
        history.push('/welcomepage')
    }

    return (
        <div className="waiting-room-wrapper">

            <div className="player-info">
                already joined:
                <div className="player-list">
                    {members.map((member) => {
                        return (
                            <div key={member.username} className="player">{member.username}</div>
                        )
                    })}
                </div>
            </div>

            <div className="bubble-item">
                <div className="bubble-container">
                    {localStorage.getItem("isLeader") ?
                        <Bubble onClick={startGame} className="bubble-button--waitingroom">Wait for players: Press to start!</Bubble>
                        : <Bubble className="bubble-button--waitingroom bubble-button--no-pointer" >Wait for players!</Bubble>
                    }
                </div>
            </div>

            <div className="room-code">
                room code:
                <br />
                {data.state.roomCode}
                <div className="game-info">
                game mode: {data.state.gameMode}
                <br />
                number of questions: {data.state.numOfQuestions}
                <br />
                difficulty: {data.state.difficulty}
                <br />
                question topic: {data.state.questionTopic}
            </div>
            </div>



            <div className="exit-button" onClick={leaveWaitingRoom}>
                exit
            </div>
            <PopUpAlert />
        </div>
    );
};

export default WaitingRoom;
