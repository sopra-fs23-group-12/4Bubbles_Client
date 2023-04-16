import React, {useMemo, useState} from 'react';
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
import {getDomainSocket} from "../../helpers/getDomainSocket";

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
    const [roomCode, setRoom] = useState("1");
    const [counter, setCounter] = useState('lets count');


//add the url of the backend to make the connection to the server (getDomainSocket returns the URL of the server depending on prod or dev environment)
    const url = format(getDomainSocket() + "?roomCode={0}", roomCode);
    const socket =  io.connect(url, { transports: ['websocket'], upgrade: false, roomCode: roomCode });


    const startTimer = () => {
        console.log("timer started");
        socket.emit('start_timer',{
            message : "",
            roomCode: roomCode,
            type: "CLIENT"})
    }

    const sendMessage = () =>{
        console.log("socket acknowledged as connected:");
        console.log(socket.connected);
        socket.emit('send_message', {
            message : "hello this is the client",
            roomCode: roomCode,
            content: inputMessage,
            type: "CLIENT"})
    }




    useEffect(async () => {
        //everytime an event happens triggered by the socket, this function is called
        socket.on("get_message", (data) =>{
            console.log("get message received:")
            console.log(data.message)
        })

        socket.on("timer_message", (data) =>{
            console.log("timer message received:")
            console.log(data.message)
        })

        socket.on("timer_count", (data) =>{
            console.log(data.message)
            setCounter(data.message);
        })
    }, [])


    return (
        <BaseContainer>
            <div className="input container">
                <div className="input form">
                    <h1>Websockets test environment</h1>

                    <div className="login button-container">
                        <Button
                            onClick={() => sendMessage()}
                            width="100%"
                        >
                            display
                        </Button>
                    </div>

                    <div className= "button">
                        <Button
                            onClick={() => startTimer()}
                            width="100%"
                        >
                            start Timer
                        </Button>
                    </div>

                    <div className="counter room-code">
                        <div className = "counter room-code">
                            {counter}
                        </div>
                    </div>

                </div>
            </div>

        </BaseContainer>
    );
};


export default Websockets;
