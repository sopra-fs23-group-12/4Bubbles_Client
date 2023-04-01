import React, { useState } from 'react';
import { api } from 'helpers/api';
import User from 'models/User';
import { useHistory, Link } from 'react-router-dom';
import { Button } from 'components/ui/Button';
import 'styles/views/Gameroom.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

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
const FormField = props => {
    return (
        <div className="login field">
            <label className="login label">
                {props.label}
            </label>
            <input
                className="login input"
                placeholder="enter here.."
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

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
        value: 3,
    },
    {
        name: '5',
        value: 5,
    },
    {
        name: '10',
        value: 10,
    },
    {
        name: '15',
        value: 15,
    },
]

const players = [
    {
        name: 'Select the players',
        value: null,
    },
    {
        name: '5',
        value: 5,
    },
    {
        name: '10',
        value: 10,
    },
    {
        name: '15',
        value: 15,
    },
]


const GameRoom = props => {
    const history = useHistory();
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

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
    };

    return (
        <BaseContainer>
            <div className="gameroom-container">
                <h1>Game Room</h1>
                <SettingsContainer title="Choose a game mode:"><RadioButtons name="gamemode" items={gameModes} /></SettingsContainer>
                <SettingsContainer title="Select the question topic:"><RadioButtons name="topics" items={gameTopics} /></SettingsContainer>
                <SettingsContainer title="Select the number of questions:"><RadioButtons name="number-of-questions" items={numberOfQuestions} /></SettingsContainer>
                <SettingsContainer ><Select name="number-of-questions" items={players} /></SettingsContainer>

                {error ? <div className="error-msg">{error}</div> : null}
                <div className="login button-container">
                    <Button
                        disabled={!username || !password}
                        onClick={() => doLogin()}
                        width="100%"
                    >
                        Start Game
                    </Button>
                </div>
            </div>
        </BaseContainer>
    );
};

export default GameRoom;
