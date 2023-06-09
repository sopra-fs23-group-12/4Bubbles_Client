import React, { useEffect, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'styles/views/Gameroom.scss';
import BaseContainer from "components/ui/BaseContainer";

import { Bubble } from 'components/ui/Bubble';
import SettingsContainer from 'components/ui/SettingsContainer';
import RadioButtons from 'components/ui/RadioButtons';
import Select from 'components/ui/Select';
import BackIcon from 'components/ui/BackIcon';
import { api, headers, handleError } from 'helpers/api';

import { useSocket } from 'components/context/socket';

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */

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

const gameMode = [
    {
        name: 'standard',
        value: 'standard',
    },
    {
        name: '1,2 oder 3',
        value: '3,2,1...',
    },
]

const difficulty = [
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
    const [questionTopic, setQuestionTopic] = useState([]);
    const [err, setErr] = useState(undefined);
    const { socket } = useSocket();

    useEffect(() => {
        getTopics();
        localStorage.removeItem('leaderReloaded');
        localStorage.removeItem('leader');
        localStorage.removeItem('isLeader');

    }, [])

    function getTopics() {

        api.get("/categories", headers()).then((response) => {
            let questionTopicArray = []
            response.data.forEach(element => {
                const topic = {
                    name: element.topicName,
                    value: element.topicName,
                    id: element.id
                }
                questionTopicArray.push(topic);
            });
            setQuestionTopic(questionTopicArray);
        }).catch((err) => {
            console.log("GameRoom.js: Something went wrong: ", err)
        })
    }

    const doSubmit = async () => {


        if (reducerState.topic === undefined || reducerState.difficulty === undefined || reducerState.gameMode === undefined || reducerState.numOfQuestions === undefined) {
            setErr('Please define all settings above.')
            return;
        }
        setErr(undefined)

        try {

            //the creation of the GameRoom is done by Rest API, joining the room, if not the leader, and joining the socketio namespace (~socket room) is done via socketio for all users
            const requestBody = JSON.stringify({
                questionTopic: reducerState.topic,
                questionTopicId: questionTopic.find(topic => topic.name === reducerState.topic).id,
                gameMode: reducerState.gameMode,
                difficulty: reducerState.difficulty,
                numOfQuestions: reducerState.numOfQuestions,
                leaderId: localStorage.getItem("userId")
            })
            console.log(requestBody)

            const response = await api.post('/createRoom', requestBody, headers())
            console.log('headers()', headers())
            //put the roomCode into localStorage for later use
            const roomCode = response.data.roomCode.toString()

            localStorage.setItem("roomCode", roomCode);
            localStorage.setItem("isLeader", true);
            localStorage.setItem("gameMode", reducerState.gameMode);
            console.log("local storage gameMode set to: ", reducerState.gameMode);
            console.log("local storage roomCode set to: ", response.data.roomCode.toString());

            //server call via socketio to join the namespace (would join the GameRoom as well, but this is the Leader anyways, who's already joined the GameRoom when they created it
            const userId = localStorage.getItem("userId");
            const bearerToken = localStorage.getItem("token");

            socket.emit('join_room', {
                userId: userId,
                bearerToken: bearerToken,
                roomCode: roomCode,
                type: "CLIENT"
            })

            //sets the answer for creating the room as state which is transferred to the waiting room such that it can be displayed there
            navigate.push({
                pathname: "/waitingroom",
                state: response.data
            })

        } catch (error) {
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
                <SettingsContainer>
                    <div className="container">
                        <span className="title">Choose a game mode:</span>
                        <span className="question-mark"></span>
                    </div>

                    <RadioButtons
                        name="gameMode"
                        items={gameMode}
                        value={reducerState.gameMode}
                        onChange={(e) =>
                            dispatch({
                                type: 'UPDATE',
                                value: e.target.value,
                                key: 'gameMode',
                            })}
                    />
                </SettingsContainer>
                <SettingsContainer title="Choose a difficulty:">
                    <RadioButtons
                        name="difficulty"
                        items={difficulty}
                        value={reducerState.difficulty}
                        onChange={(e) =>
                            dispatch({
                                type: 'UPDATE',
                                value: e.target.value,
                                key: 'difficulty',
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
                <div className="error-message">
                    {err !== undefined ? err : null}
                </div>
                <Bubble onClick={() => doSubmit()}>Start<br />Game</Bubble>
            </div>
            <BackIcon />
        </BaseContainer>
    );
};

export default GameRoom;
