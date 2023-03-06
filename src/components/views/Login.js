import React, { useState } from 'react';
import { api } from 'helpers/api';
import User from 'models/User';
import { useHistory, Link } from 'react-router-dom';
import { Button } from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

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
      <div className="login container">
        <div className="login form">
          <h1>Login</h1>
          <FormField
            label="Username"
            value={username}
            onChange={un => setUsername(un)}
          />
          <FormField
            label="Password"
            value={password}
            onChange={n => setPassword(n)}
          />
          {error ? <div className="error-msg">{error}</div> : null}
          <div className="login button-container">
            <Button
              disabled={!username || !password}
              onClick={() => doLogin()}
              width="100%"
            >
              Login
            </Button>
          </div>
          <div className="sign-up">
            <Link to={"/register"}>sign up</Link>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Login;
