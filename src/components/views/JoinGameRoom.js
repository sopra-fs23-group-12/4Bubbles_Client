import {useState } from 'react';
import { api, handleError, headers } from 'helpers/api';
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
          placeholder="RoomCode.."
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
  const userId = localStorage.getItem("userId");

  const joinRoom = async () => {
    try {
      const requestBody = ({
        roomCode: roomCode,
        userId: userId

      });
      console.log("data: ", requestBody);

      const response = await api.put('/joinRoom', requestBody, headers);
      console.log(response);
      history.push({
        pathname: "/waitingroom", 
        state: response.data
      });
      
    }
    catch (error) {
        alert(`Something went wrong while joining a room: \n${handleError(error)}`);
    }
  }

  const toHomepage = () => {
    history.push("/overview");
  }  

  return (
    <BaseContainer>
      <h1>Enter a room code</h1>
      <div className="login field">
        <FormField
        value = {roomCode}
        onChange = {rC => setRoomCode(rC)}
        ></FormField>
      </div>
        <Bubble onClick={joinRoom}> Enter Game </Bubble>
        <BackIcon onClick={toHomepage}></BackIcon>
    </BaseContainer>
  );
}

export default JoinGameRoom;
