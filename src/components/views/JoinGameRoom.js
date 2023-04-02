import {useState } from 'react';
import { api, handleError } from 'helpers/api';
import { useHistory } from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";


import {EnterGameBubble } from 'components/ui/Bubble';
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

const JoinGameRoom = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();
  const[roomCode, setRoomCode] = useState("");
  const[userId, setUserId] = useState(localStorage.getItem("id"));

  const joinRoom = async () => {
    try {
      const requestBody = JSON.stringify({
        roomCode: roomCode,
        userId: userId

      });
      const response = await api.get('/joinRoom', requestBody);
      console.log(response);
    }
    catch (error) {
        alert(`Something went wrong while joining a room: \n${handleError(error)}`);
    }
  }

  const toHomepage = () => {
    history.push("/overview");
  }  

  return (
    <BaseContainer className="join container">
        <FormField
        label = "Enter a RoomCode"
        value = {roomCode}
        onChange = {rC => setRoomCode(rC)}
        ></FormField>
        <EnterGameBubble onClick={joinRoom}> Enter Game </EnterGameBubble>
        <BackButton onClick={toHomepage}></BackButton>
    </BaseContainer>
  );
}

export default JoinGameRoom;
