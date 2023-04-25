import React, { useState, useEffect, useMemo } from 'react';
import { Bubble } from 'components/ui/Bubble';
import { useLocation } from 'react-router-dom';
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
    const [timerValue, setTimerValue] = useState(null);
    const [question, setQuestionValue] = useState(null);
    const [answer1, setAnswer1Value] = useState(null);
    const [answer2, setAnswer2Value] = useState(null);
    const [answer3, setAnswer3Value] = useState(null);
    const [answer4, setAnswer4Value] = useState(null);
    //const [answerx, setAnswer1Valuex] = useState(null);

    const data = useLocation();
    console.log("data: ", data);
    console.log("localStorage: ", localStorage);
    //console.log("roomCode: ", localStorage.roomCode);
    
    const roomCode = localStorage.roomCode

    //url from backend for websocket connection
    // const url = format(getDomainSocket() + "?roomCode={0}", roomCode);
    // const socket =  io.connect(url, { transports: ['websocket'], upgrade: false, roomCode: roomCode });

    const url = format(getDomainSocket() + "?roomCode={0}", roomCode);
    const socket = useMemo(() => io.connect(url, { transports: ['websocket'], upgrade: false, roomCode: roomCode }), []);
    //console.log("useMemo roomCode: ", roomCode);
    console.log("socket acknowledged as connected:", socket.connected);

    //const question = "Which river has the most capital cities on it?"

    // const answer = [
    //     answer1,
    //     answer2,
    //     answer3,
    //     answer4
    // ]

    const answer = [
            answer1,
            answer2,
            answer3,
            answer4
        ]


    // const answer = [
    //     "Amazon",
    //     "Nile",
    //     "Congo River",
    //     "Danube"
    // ]

    const cssClasses = [
        "answer-item-top-left",
        "answer-item-top-right",
        "answer-item-bottom-right",
        "answer-item-bottom-left",
    ]

    const revealAnswer = () => {
        //startCountdown(5);
        //enter correct answer here
        setCorrectAnswer(0);
        const timer = setTimeout(() => {
            console.log('answer correct:', radioValue === answer[0]);
            setPopupValue(radioValue === answer[0]);
        }, 2000);
        return () => clearTimeout(timer);
    }

    const nextQuestion = () => {

        console.log("socket acknowledged as connected with nextQuestion:", socket.connected);
        // socket.emit('start_game', {
        //     message : "",
        //     roomCode: roomCode,
        //     type: "CLIENT"})
          
        // socket.emit('start_timer', {
        //     message : "",
        //     roomCode: roomCode,
        //     type: "CLIENT"})

        setPopupValue(null);
        setCorrectAnswer(null);
    }

        // //prototype counter
        // function startCountdown(seconds) {
        //     setTimerValue(timerValue = seconds);
              
        //     const interval = setInterval(() => {
        //       //console.log(timerValue);
        //       setTimerValue(timerValue--);
                
        //       if (timerValue < 0 ) {
        //         clearInterval(interval);
        //         console.log('End of counter!');
        //       }
        //     }, 1000);
        //   }


    //const question = null;

    useEffect(async () => {
        console.log("socket acknowledged as connected in useEffect:", socket.connected);
        //console.log("roomCode at emit: ", roomCode);

        socket.emit('start_game',{
            message : "",
            roomCode: roomCode,
            type: "CLIENT"})

        socket.emit('send_vote',{
            remainingTime : 5,
            message : "jo",
            roomCode: roomCode,
            type: "CLIENT"})

        //everytime an event happens triggered by the socket, this function is called
        socket.on("get_question", (data) =>{
            console.log("question arrived:", data)
            setQuestionValue(data)
        })

        socket.on("get_answers", (data) =>{
            //let newStr = data.slice(-1,-1);
            let newStr = data.substr(1, data.length - 2);
            const answersArray = newStr.split(",")
            setAnswer1Value(answersArray[0])
            setAnswer2Value(answersArray[1])
            setAnswer3Value(answersArray[2])
            setAnswer4Value(answersArray[3])
            //console.log("answers arrived:", data)
            //console.log("CUTTED answers arrived:", newStr)
        })

        //WE NEED A SOCKET.ON GET CORRECT ANSWER

        socket.on("timer_count", (data) =>{
            //console.log("timer arrived:", data)
            setTimerValue(data)
            if (timerValue === 1)
                {(console.log("YES"))}
                   })
            
    }, [])

    return (
        <div className="question-wrapper">



            <div className="question-item">
            <div className="timer">
            {timerValue} 

            </div>
           
                <Bubble //question bubble
                onClick={revealAnswer} 
                className="bubble-button--question">{question}
                </Bubble>

            </div>

            {answer.map((item, index) => {
                if (item === null) {
                    return null;}
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
