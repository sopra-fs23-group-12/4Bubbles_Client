import React, { useState, useEffect, useReducer, useMemo } from 'react';
import { Bubble } from 'components/ui/Bubble';
import { useLocation, useHistory } from 'react-router-dom';
import {getDomainSocket} from "../../helpers/getDomainSocket";
import { format } from 'react-string-format';
import io from "socket.io-client";

import '../../styles/views/Question.scss';


const Question = props => { 

    //websockets need to communicate:
    // timing
    // votes
    // questions (initial)
    // questions (reveal)
    // bubble sizes?

    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [popupValue, setPopupValue] = useState(null);
    const [radioValue, setRadioValue] = useState(null);
    const [roomCode, setRoom] = useState("1");
    const data = useLocation();
  

    //url from backend for websocket connection
    // const url = format(getDomainSocket() + "?roomCode={0}", roomCode);
    // const socket =  io.connect(url, { transports: ['websocket'], upgrade: false, roomCode: roomCode });

    const url = format(getDomainSocket() + "?roomCode={0}", roomCode);
    const socket = useMemo(() => io.connect(url, { transports: ['websocket'], upgrade: false, roomCode: roomCode }), []);

    console.log("socket acknowledged as connected:", socket.connected);

    //const question = "Which river has the most capital cities on it?"
    const answer = [
        "Amazon",
        "Nile",
        "Congo River",
        "Danube"
    ]

    const cssClasses = [
        "answer-item-top-left",
        "answer-item-top-right",
        "answer-item-bottom-right",
        "answer-item-bottom-left",
    ]

    const revealAnswer = () => {
        setCorrectAnswer(0);
        const timer = setTimeout(() => {
            console.log('answer correct:', radioValue === answer[0]);
            setPopupValue(radioValue === answer[0]);
        }, 2000);
        return () => clearTimeout(timer);
    }

    const nextQuestion = () => {
        console.log("socket acknowledged as connected with nextQuestion:", socket.connected);
        socket.emit('start_game', {
            message : "",
            roomCode: roomCode,
            type: "CLIENT"})
          
        // socket.emit('start_timer', {
        //     message : "",
        //     roomCode: roomCode,
        //     type: "CLIENT"})

        setPopupValue(null);
        setCorrectAnswer(null);
    }
    const question = null;

    useEffect(async () => {
        console.log("socket acknowledged as connected in useEffect:", socket.connected);

        //everytime an event happens triggered by the socket, this function is called
        socket.on("get_question", (data) =>{
            console.log("question arrived:")
            console.log(data.message)
            question = data.message;
        })

        socket.on("get_answers", (data) =>{
            console.log("answers arrived:")
            console.log(data.message)
        })

        // socket.on("game_started", (incomingData) =>{
        //     console.log("game_started received", incomingData);
        // })

        // socket.on("timer_message", (data) =>{
        //     console.log("timer message received:")
        //     console.log(data.message)
        // })
        // socket.on("timer_count", (data) =>{
        //     console.log(data.message)
        //     setCounter(data.message);
        // })

    }, [])

    // join websocket connection again, since there was a disconnect when the push to /waitingroom happened
    // const roomCode = data.state.roomCode
    // const url = format(getDomainSocket() + "?roomCode={0}", roomCode);
    // const socket = useMemo(() => io.connect(url, { transports: ['websocket'], upgrade: false, roomCode: roomCode }), []);

    


    return (
        <div className="question-wrapper">
            <div className="question-item">
                <Bubble onClick={revealAnswer} className="bubble-button--question">{question}</Bubble>
            </div>
            {answer.map((item, index) => {
                return <div key={item} className={cssClasses[index]}>
                    <input type="radio" id={item} name="fav_language" value={item} checked={radioValue === item} onChange={() => setRadioValue(item)} />
                    <label htmlFor={item}>
                        <Bubble className={(correctAnswer === null || index === correctAnswer) ? "bubble-button--answer" : "bubble-button--splashed bubble-button--answer"}>{item}</Bubble>
                    </label>
                </div>
            })}


            {(popupValue !== null) ?
                <div className="pop-up">
                    <div className="pop-up__container">
                        <span>{popupValue ? 'Your answer was correct! ✌️' : 'Your answer was wrong... 😱'}</span>
                        <button onClick={nextQuestion} className="primary-button">ok</button></div>
                </div >
                : null
            }

        </div >
    )
};
export default Question;
