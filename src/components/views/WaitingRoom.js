import React from 'react';
import { useHistory } from 'react-router-dom';
import 'styles/views/Gameroom.scss';
import BaseContainer from "components/ui/BaseContainer";

import { useLocation } from 'react-router-dom';

import { Bubble } from 'components/ui/Bubble';
import SettingsContainer from 'components/ui/SettingsContainer';
import RadioButtons from 'components/ui/RadioButtons';
import Select from 'components/ui/Select';
import BackIcon from 'components/ui/BackIcon';

/*
file is only here to test if joinRoom works with the backend
design and further functionality is npt as it should be
the data from the backend is received but only the question Topic can be displayed
roomcode is also be displayed 
 */

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




const WaitingRoom = (props) => {
    const history = useHistory();
    const data = useLocation();
    console.log("data:", data);

    
    //const so that only leader can start game, does nothing usefull yet
    const doStart = () => {
        if (data.state.leader == localStorage.getItem('userId')) {
            history.push(`/profile/${localStorage.getItem('userId')}`);
        }
    }

    return (
        <BaseContainer>
            <div className="gameroom-container">
                <h1>Game Room <br/> {data.state.roomCode}</h1>
                <SettingsContainer >
                    <Select
                        name="number-of-questions"
                        items={gameTopics}
                        value={data.state.questionTopic}
                        onChange={(value) =>
                            null} />
                </SettingsContainer>
                <SettingsContainer title="Choose a game mode:">
                    <RadioButtons
                        name="gamemode"
                        items={gameModes}
                        value={data.state.gamemode}
                        onChange={(e) =>
                            null} />
                </SettingsContainer>
                <SettingsContainer title="Select the number of questions:">
                    <RadioButtons
                        name="number-of-questions"
                        items={numberOfQuestions}
                        value={data.state.numOfQuestions}
                        onChange={(e) =>
                            null} />
                </SettingsContainer>

                
                <Bubble onClick={() => doStart()}>Get<br />Ready!</Bubble>
            </div>
            <BackIcon />
        </BaseContainer>
    );
};

export default WaitingRoom;
