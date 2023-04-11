import React, { useState } from 'react';
import { api } from 'helpers/api';
import User from 'models/User';
import { useHistory, Link } from 'react-router-dom';
import { Button } from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import io from "socket.io-client";
import {useEffect} from "react";
import { format } from 'react-string-format';

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
    const [room, setRoom] = useState("a");

    //add the url of the backend to make the connection to the server
    const url = format("http://localhost:9092?room={0}", room);
    const socket = io.connect(url,{transports: ['websocket'], upgrade: false, room: room});


    const displayDisplayMessage = () =>{
        console.log("display message method reached")
        setDisplayMessage(inputMessage);
        try{
            sendMessage();
        }catch (Exception){
            console.log("send message throws an error")
        }

        setInputMessage('');
    }

    const sendMessage = () =>{
        console.log("send message method reached")
        socket.emit("send_message", {
                room: room,
                content: inputMessage,
                messageType: "CLIENT",
        })
    }

    //everytime an event happens triggered by the socket, this function is called
    useEffect(async () =>{
        socket.on("receive_message", (data) =>{
            console.log("message received")
            alert(data.message)
        })
    })


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
