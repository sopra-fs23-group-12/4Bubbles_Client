import { useEffect, useState } from 'react';
import { handleError } from 'helpers/api';
import { useHistory } from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";

import { useSocket } from 'components/context/socket';


import { Bubble } from 'components/ui/Bubble';
import BackIcon from 'components/ui/BackIcon';
import { format } from "react-string-format";
import { getDomainSocket } from "../../helpers/getDomainSocket";

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
  const [roomCode, setRoomCode] = useState("");
  const userId = localStorage.getItem("userId");
  const bearerToken = localStorage.getItem("token");
  const [error, setError] = useState("");

  const { socket, connect } = useSocket();

  // establish a websocket connection (joins namespace for only the sender client)
  const url = format(getDomainSocket());
  connect(url, { transports: ['websocket'], upgrade: false, roomCode: roomCode })

  const joinRoom = async () => {
    try {

      //sending the event + info to the client to join the specified room
      console.log("emitting join_room to server")
      socket.emit('join_room', {
        userId: userId,
        bearerToken: bearerToken,
        roomCode: roomCode,
        type: "CLIENT"
      })

      //putting the room Code the user typed in localStorage for later use
      localStorage.setItem("roomCode", roomCode);


    }
    catch (error) {
      alert(`Something went wrong while joining a room: \n${handleError(error)}`);
    }
  }

  useEffect(() => {
    localStorage.removeItem('leaderReloaded');
    localStorage.removeItem('leader');
    localStorage.removeItem('isLeader');
    //everytime an event happens triggered by the socket, this function is called
    socket.on("room_is_joined", (response) => {
      console.log("room_is_joined received from the server, response: ")
      console.log(response)
      // the response should contain a Json Object for the GameRoomDTO, specifying all the room configurations
      localStorage.setItem('leader', response.leader.username);
      history.push({
        pathname: "/waitingroom",
        state: response
      });
    })

    socket.on("an_error_occured", (response) => {
      console.log("an_error_occurred received from the server, response: ")
      console.log(response)
      
      setError(response);
    }
    )

    return () => {
      socket.off('an_error_occured');
      socket.off('room_is_joined');
  };
  }, [socket])

  const toHomepage = () => {
    history.push("/overview");
  }

  return (
    <BaseContainer>
      <h1>Enter a room code</h1>
      <div className="login field">
        <FormField
          value={roomCode}
          onChange={rC => setRoomCode(rC)}
        ></FormField>
        {error ? <div className="error-msg">{error}</div> : null}
      </div>
      <div className="login button-container">
        <Bubble onClick={joinRoom}> Enter Game </Bubble>
      </div>
      <BackIcon onClick={toHomepage}></BackIcon>
    </BaseContainer>
  );
}

export default JoinGameRoom;
