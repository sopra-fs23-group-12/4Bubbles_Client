import {useState } from 'react';
import { api, handleError } from 'helpers/api';
import { useHistory } from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";


import {Bubble } from 'components/ui/Bubble';
import BackIcon from 'components/ui/BackIcon';

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
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await api.put('/joinRoom', requestBody, headers);
      history.push({
        pathname: "/waitingroom", 
        state: response.data
      });
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
      <h1>Enter a room code</h1>
        <FormField
        label = "Enter a RoomCode"
        value = {roomCode}
        onChange = {rC => setRoomCode(rC)}
        ></FormField>
        <Bubble onClick={joinRoom}> Enter Game </Bubble>
        <BackIcon onClick={toHomepage}></BackIcon>
    </BaseContainer>
  );
}

export default JoinGameRoom;
