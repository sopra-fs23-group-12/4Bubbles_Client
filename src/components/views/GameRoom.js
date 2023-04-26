import React, { useEffect, useReducer, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import 'styles/views/Gameroom.scss';
import BaseContainer from "components/ui/BaseContainer";

import { Bubble } from 'components/ui/Bubble';
import SettingsContainer from 'components/ui/SettingsContainer';
import RadioButtons from 'components/ui/RadioButtons';
import Select from 'components/ui/Select';
import BackIcon from 'components/ui/BackIcon';
import {api, headers, handleError} from 'helpers/api';
import {format} from "react-string-format";
import {getDomainSocket} from "../../helpers/getDomainSocket";
import io from "socket.io-client";
/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */


// establish a websocket connection (joins namespace for only the sender client sessionId (this ID is automatically generated in the server)
const url = format(getDomainSocket() );
const socket = io.connect(url,{transports: ['websocket'], upgrade: false});


function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE':
            return {
                ...state, [action.key]: action.value,
            }
        case 'REPLACE':
            return action.payload;
        default:
            return state
    }
}

async function getTopics(){
    const response = await api.get("/categories", headers())
    console.log("Response for api call /categories: ",response.data)
    response.data.forEach(element => {
        const topic = {
            name: element.topicName, 
            value: element.topicName,
            id: element.id
        }
        questionTopic.push(topic);
    });
    console.log("Complete list of topics: ",questionTopic)
    return questionTopic;
}

const gameMode = [
    {
        name: 'easy',
        value: 'easy',
    },
    {
        name: 'medium',
        value: 'medium',
    },
    {
        name: 'hard',
        value: 'hard',
    },
]

const questionTopic = [];



const numOfQuestions = [
    {
        name: '3',
        value: '3',
    },
    {
        name: '5',
        value: '5',
    },
    {
        name: '10',
        value: '10'
    },
    {
        name: '15',
        value: '15',
    },
] 


const GameRoom = props => {
    const [reducerState, dispatch] = useReducer(reducer, {});
    const navigate = useHistory();
   

    useEffect(() => {
        getTopics()
    
    }, [] )


    
    const doSubmit = async () => {
        try{

            //the creation of the GameRoom is done by Rest API, joining the room, if not the leader, and joining the socketio namespace (~socket room) is done via socketio for all users
            const requestBody = JSON.stringify({
                questionTopic: reducerState.topic,
                questionTopicId: questionTopic.find(topic => topic.name === reducerState.topic).id,
                gameMode: reducerState.gamemode,
                numOfQuestions: reducerState.numOfQuestions,
                leaderId: localStorage.getItem("userId")
            })
            console.log(requestBody)

            const response = await api.post('/createRoom', requestBody, headers())
            console.log('headers()', headers())
            //put the roomCode into localStorage for later use
            const roomCode = response.data.roomCode.toString()
            
            localStorage.setItem("roomCode", roomCode);
            
            

            console.log("local storage roomCode set to: ", response.data.roomCode.toString());


            //server call via socketio to join the namespace (would join the GameRoom as well, but this is the Leader anyways, who's already joined the GameRoom when they created it
            const userId = localStorage.getItem("userId");
            const bearerToken = localStorage.getItem("token");


            socket.emit('join_room', {
                userId : userId,
                bearerToken : bearerToken,
                roomCode: roomCode,
                type: "CLIENT"})


            //sets the answer for creating the room as state which is transferred to the waiting room such that it can be displayed there
            navigate.push({
                pathname : "/waitingroom",
                state: response.data
            })

        }catch(error){
            alert(`Something went wrong while creating a room: \n${handleError(error)}`);
        }
    }

    
    return (
        <BaseContainer>
            <div className="gameroom-container">
                <h1>Game Room</h1>
                <SettingsContainer >
                    <Select
                        name="number-of-questions"
                        items={questionTopic}
                        value={reducerState.topic}
                        onChange={(value) =>
                            dispatch({
                                type: 'UPDATE',
                                value: value,
                                key: 'topic',
                            })} />
                </SettingsContainer>
                <SettingsContainer title="Choose a difficulty:">
                    <RadioButtons
                        name="gamemode"
                        items={gameMode}
                        value={reducerState.gamemode}
                        onChange={(e) =>
                            dispatch({
                                type: 'UPDATE',
                                value: e.target.value,
                                key: 'gamemode',
                            })} />
                </SettingsContainer>
                <SettingsContainer title="Select the number of questions:">
                    <RadioButtons
                        name="number-of-questions"
                        items={numOfQuestions}
                        value={reducerState.numOfQuestions}
                        onChange={(e) =>
                            dispatch({
                                type: 'UPDATE',
                                value: e.target.value,
                                key: 'numOfQuestions',
                            })} />
                </SettingsContainer>


                <Bubble onClick={() => doSubmit()}>Start<br />Game</Bubble>
            </div>
            <BackIcon />
        </BaseContainer>
    );
};

export default GameRoom;
