import {useState } from 'react';
import { api, handleError } from 'helpers/api';
import { useHistory } from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";


import { Bubble, EnterGameBubble } from 'components/ui/Bubble';
import { BackButton } from 'components/ui/BackButton';

const FormField = props => {
    return (
    <div className="login field">
        <label className="login label">
        {props.label}
        </label>
        <input
        className="login input"
        placeholder="Enter RoomCode here.."
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

const CreateRoom = () => {
    const history = useHistory();
    const [questionTopic, setQuestionTopic] = useState("");
    const [gameMode, setGameMode] = useState("");
    const [numOfQuestions, setNumOfQuestion] = useState("");
    const [userId] = useState(localStorage.getItem("id"));
    const [roomCode, setRoomCode] = useState("");


    const doCreateRoom = async () => {
        try {
        const requestBodyCreate = JSON.stringify({
            questionTopic: questionTopic,
            gameMode: gameMode,
            numOfQuestions: numOfQuestions,
            userId: userId

        });

        const requestBodyJoin = JSON.stringify({
            roomCode: roomCode,
            userId: userId
            
            });
        const response = await api.post('/createRoom', requestBodyCreate);
        console.log(response);
        setRoomCode(response.data.roomCode);

        const response2 = await api.get('/joinRoom', requestBodyJoin);
        console.log(response2);
        history.push("/overview");  //redirect to gameRoom uncomment when game room is done
        }
        catch (error) {
            alert(`Something went wrong while creating a room: \n${handleError(error)}`);
        }
        }

    const toHomepage = () => {
        history.push("/overview");
    }  

    return (
        <BaseContainer className="base container">
            <FormField
            label = "Enter Question Topic"
            value = {questionTopic}
            onChange = {qT => setQuestionTopic(qT)}
            ></FormField>
            <FormField
            label = "Enter Game Mode"
            value= {gameMode}
            onChange = {gM => setGameMode(gM)}
            ></FormField>
            <FormField
            label = "Enter Number of Questions"
            value = {numOfQuestions}
            onChange = {nQ => setNumOfQuestion(nQ)}
            ></FormField>
            <EnterGameBubble onClick={doCreateRoom}> Enter Game </EnterGameBubble>
            <BackButton onClick={toHomepage}> Back </BackButton>
        </BaseContainer>
    );
}

export default CreateRoom;
