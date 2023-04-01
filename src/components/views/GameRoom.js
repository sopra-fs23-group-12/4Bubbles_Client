import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import 'styles/views/Gameroom.scss';
import BaseContainer from "components/ui/BaseContainer";

import { Bubble } from 'components/ui/Bubble';
import SettingsContainer from 'components/ui/SettingsContainer';
import RadioButtons from 'components/ui/RadioButtons';
import Select from 'components/ui/Select';
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

const gameModes = [
    {
        name: 'standard',
        value: 'standard',
    },
    {
        name: 'time tells',
        value: 'time tells',
    },
    {
        name: 'trust or bust',
        value: 'trust or bust',
    },
]

const gameTopics = [
    {
        name: 'choose a question topic',
        value: 'null',
    },
    {
        name: 'general knowledge',
        value: 'general knowledge',
    },
    {
        name: 'art',
        value: 'art',
    },
    {
        name: 'history',
        value: 'history',
    },
    {
        name: 'food and drinks',
        value: 'food and drinks',
    },
    {
        name: 'sports',
        value: 'sports',
    },
    {
        name: 'geography',
        value: 'geography',
    },
    {
        name: 'nature',
        value: 'nature',
    },
]

const numberOfQuestions = [
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

    const doSubmit = async () => {
        console.log(reducerState);
    }

    /*
    const doLogin = async () => {
        try {
            const requestBody = JSON.stringify({ username, password });
            const response = await api.post('/login', requestBody);
    
            // Get the returned user and update a new object.
            const user = new User(response.data);
    
            // Store the token into the local storage.
            localStorage.setItem('token', user.token);
            localStorage.setItem('userId', user.id);
    
    
            // Login successfully worked --> navigate to the route /game in the GameRouter
            history.push(`/overview`);
        } catch (error) {
            //alert(`Something went wrong during the login: \n${handleError(error)}`);
            setError(error.response.data.message);
        }
    };*/

    return (
        <BaseContainer>
            <div className="gameroom-container">
                <h1>Game Room</h1>
                <SettingsContainer >
                    <Select
                        name="number-of-questions"
                        items={gameTopics}
                        value={reducerState.topic}
                        onChange={(e) =>
                            dispatch({
                                type: 'UPDATE',
                                value: e.target.value,
                                key: 'topic',
                            })} />
                </SettingsContainer>
                <SettingsContainer title="Choose a game mode:">
                    <RadioButtons
                        name="gamemode"
                        items={gameModes}
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
                        items={numberOfQuestions}
                        value={reducerState.numberOfQuestions}
                        onChange={(e) =>
                            dispatch({
                                type: 'UPDATE',
                                value: e.target.value,
                                key: 'numberOfQuestions',
                            })} />
                </SettingsContainer>


                <Bubble onClick={() => doSubmit()}>Start<br />Game</Bubble>
            </div>
            <div className="back-icon" onClick={() => navigate.goBack()}><img src="/assets/undo-circle.png" alt="back-icon" /></div>
        </BaseContainer>
    );
};

export default GameRoom;
