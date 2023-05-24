import React, { useState } from 'react';
import { api } from 'helpers/api';
import User from 'models/User';
import { useHistory} from 'react-router-dom';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import { Bubble } from 'components/ui/Bubble';

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = props => {
  const isPasswordField = props.label.toLowerCase() === "password";
  return (
    <div className="login field">
      <input
        className="login input"
        type = {isPasswordField ? "password": "text"}
        placeholder={props.label}
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

const Register = props => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");


  const doRegister = async () => {
    try {
      const requestBody = JSON.stringify({ username, password });
      const response = await api.post('/register', requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);
      console.log(user);

      // Store the token into the local storage.
      localStorage.setItem('token', user.token);
      localStorage.setItem('userId', user.id);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      history.push(`/welcomepage`);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <BaseContainer>
    <h1>Welcome to 4Bubbles</h1>
      <div className="login container">
        <div className="login form">
          <FormField
            label="username"
            value={username}
            onChange={un => setUsername(un)}
          />
          <FormField
            label="password"
            value={password}
            onChange={n => setPassword(n)}
          />
          {error ? <div className="error-msg">{error}</div> : null}
          <div className="login button-container">
            <Bubble
              disabled={!username || !password}
              width="100%"
              onClick={() => doRegister()}
            >
              sign up
            </Bubble>
          </div>
          <div className="login button-container2">
          <Bubble 
            onClick={() => history.push(`/login`)}
            >
              <font size="4"><center>back to <br/>login</center></font> 
            </Bubble>
            </div>
        </div>
      </div>
      <div className="login sopra-text">
       by sopra 2023
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Register;
