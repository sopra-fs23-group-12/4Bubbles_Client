import { useEffect, useState } from 'react';
import { api, handleError } from 'helpers/api';
import { Spinner } from 'components/ui/Spinner';
import { Button } from 'components/ui/Button';
import { useHistory } from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import { Link } from 'react-router-dom';
import logoutRequest from 'helpers/axios';

import { Bubble } from 'components/ui/Bubble';

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


  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://reactjs.org/docs/hooks-state.html
  const [users, setUsers] = useState(null);

  const toHomepage = () => {
    history.push("/overview");
  }  

  return (
    <BaseContainer className="join container">
        <FormField
        label = "Enter a RoomCode"
        ></FormField>
        <Bubble 
        padding bottom ="10px"
        onClick={toHomepage}
        > Enter Game </Bubble>
    </BaseContainer>
  );
}

export default JoinGameRoom;
