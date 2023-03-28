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
        <div className="display field">
            <label className="display label">
                {props.label}
            </label>
            <input
                className="display input"
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



const Websockets = props => {
    const history = useHistory();
    const [error, setError] = useState("");
    const [inputMessage, setInputMessage] = useState("");
    const [displayMessage, setDisplayMessage] = useState("");

    const displayDisplayMessage = async() =>{
        setDisplayMessage(inputMessage)
        setInputMessage('')
    }


    return (
        <BaseContainer>
            <div className="input container">
                <div className="input form">
                    <h1>Websockets test environment</h1>
                    <FormField
                        label="message"
                        value={inputMessage}
                        onChange={message => setInputMessage(message)}
                    />
                    {error ? <div className="error-msg">{error}</div> : null}
                    <div className="login button-container">
                        <Button
                            onClick={() => displayDisplayMessage()}
                            width="100%"
                        >
                            display
                        </Button>
                    </div>
                </div>
            </div>
            <div id={'message-container'} >

                <p> value = {displayMessage} </p>
            </div>
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Websockets;
