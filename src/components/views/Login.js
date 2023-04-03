import BaseContainer from "components/ui/BaseContainer";
import { Button } from 'components/ui/Button';
import { api } from 'helpers/api';
import User from 'models/User';
import PropTypes from "prop-types";
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'styles/views/Login.scss';
import { Bubble } from 'components/ui/Bubble';

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = props => {
  return (
    <div className="login field">
      {/* <label className="login label">
        {props.label}
      </label> */}
      <input
        className="login input"
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

const Login = props => {
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
              onClick={() => doLogin()}
              width="100%"
            >
              Login
            </Bubble>
          </div>
          <div className="login button-container2">
            <Bubble 
            onClick={() => history.push(`/register`)}
            >
              <font size="4">sign up</font> 
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
export default Login;
