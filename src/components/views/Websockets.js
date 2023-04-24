import React, {useState} from 'react';
import { Button } from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import io from "socket.io-client";
import {useEffect} from "react";
import { format } from 'react-string-format';
import {getDomainSocket} from "../../helpers/getDomainSocket";


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

    /*
    this is a demo side for the websockets with socketio client implementation

    there are three main socket.io functionalities:
        - joining a namespace (="room")
        - emitting an event to the server
        - receiving an event from the server


    joining an event:

        io.connect

        we need to specify the url we want to connect to. This is done via the getDomainSocket class. Info: Websockets run on port 9092 serverside.
        The namespace we connect with is specified as URL parameter. This is the URL we send as the request, not the URL in the client browser.
        The other parameters are part of multiple measures to keep the client from constantly reconnecting. The function returns the socket we can
        use for further operations on that connection going forward

    emitting an event:

        socket.emit(*"event name"", {*object you want to send*})

        The attributes for .emit have to match the listener in the backend, or they wont be received. The corresponding server listener in the
        backend will execute the method that is defined for it, when it receives a message with that event name.


    receiving an event:

        useEffect(async () => {
            socket.on(*"event name"*, (data) =>{
            ...
            })

        Methods like these have to be specified in useEffect(). They listen for an event/call from the server with the message name they need.
        Together with an event name, the server might send a Json Data Object, which can be accessed. Upon such a reception, the specified method is executed.

     */



const Websockets = props => {

    const [inputMessage] = useState("");
    const [roomCode] = useState("1");
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
