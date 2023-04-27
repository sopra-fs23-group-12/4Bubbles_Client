import React, { useState, useEffect, useMemo } from 'react';
import { Bubble } from 'components/ui/Bubble';
import { useLocation } from 'react-router-dom';
import { getDomainSocket } from "../../helpers/getDomainSocket";
import { format } from 'react-string-format';
import io from "socket.io-client";
import Timer from 'components/ui/timer';

import '../../styles/views/Question.scss';

import Ranking from './Ranking';
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
    const [showRanking, setShowRanking] = useState(false);
    const [ranking, setRanking] = useState(null);
    const [final, setFinal] = useState(false);
    const [showTimerXY, setShowTimerXY] = useState(false);

    //const [answerx, setAnswer1Valuex] = useState(null);

    const data = useLocation();
    // console.log("data: ", data);
    // console.log("localStorage: ", localStorage);
    //console.log("SEARCHED VALUEEEEEE:",radioValue)
    //console.log("roomCode: ", localStorage.roomCode);

    const roomCode = localStorage.roomCode

    const url = format(getDomainSocket() + "?roomCode={0}", roomCode);
    const socket = useMemo(() => io.connect(url, { transports: ['websocket'], upgrade: false, roomCode: roomCode }), []);

    const answer = [
        answer1,
        answer2,
        answer3,
        answer4
    ]

    const cssClasses = [
        "answer-item-top-left",
        "answer-item-top-right",
        "answer-item-bottom-right",
        "answer-item-bottom-left",
    ]

    const revealAnswer = () => {


    }


    const sendVote = (item) => {
        setRadioValue(item)
        // console.log("sendVote of:", item);
        // console.log("radioValue:", radioValue);

        socket.emit('send_vote', {
            userId: localStorage.userId,
            remainingTime: timerValue,
            message: item,
            roomCode: roomCode,
            type: "CLIENT"
        }
        )
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
        //setRadioValue(null);
    }

    //prototype counter
    function startCountdown(seconds) {
        //setTimerValue(seconds);

        const interval = setInterval(() => {
            seconds = seconds -1;
          //console.log(timerValue);
          setTimerValue(seconds);

          if (seconds < 1) {
            clearInterval(interval);
            console.log('End of counter!');

            socket.emit('end_of_question', {
                message: "",
                roomCode: roomCode,
            })
          }
        }, 1000);
      }


    //const question = null;

    useEffect(() => {
        console.log("socket acknowledged as connected in useEffect:", socket.connected);

        //everytime an event happens triggered by the socket, this function is called
        socket.on("get_question", (data) => {
            console.log("question arrived:", data)
            setQuestionValue(data)
            setShowRanking(false);
        })

        socket.on("get_ranking", (data) => {
            console.log("ranking arrived:", JSON.parse(data));
            setShowRanking(true);
            const rank = JSON.parse(data)['ranking'];
            const fin = JSON.parse(data)['final_round'][0];
            console.log(fin);
            setRanking(rank);
            setFinal(fin);
            setRadioValue(null);
        })

        socket.on("get_answers", (data) => {
            //let newStr = data.slice(-1,-1);
            let newStr = data.substr(1, data.length - 2);
            const answersArray = newStr.split(",")
            setAnswer1Value(answersArray[0])
            setAnswer2Value(answersArray[1].substr(1))
            setAnswer3Value(answersArray[2].substr(1))
            setAnswer4Value(answersArray[3].substr(1))
            console.log("answers arrived:", data)
            startCountdown(11);
            revealAnswer();
            //setTimeout(revealAnswer, 100)

        })

        socket.on("get_right_answer", (data) => {
            console.log("right answer arrived:", data)
            setCorrectAnswer(data)
            socket.emit('request_ranking', {
                userId: localStorage.userId,
                remainingTime: timerValue,
                roomCode: roomCode,
                type: "CLIENT"
            });

            var currentRadioValue;
            setRadioValue(currentState_ => {
                currentRadioValue = currentState_;
                return currentState_;  // don't actually change the state
             })
            console.log("RADIOVALUE:", currentRadioValue);
            

            // var currentCorrectAnswer;
            // setCorrectAnswer(currentAns_ => {
            //     currentCorrectAnswer = currentAns_;
            //     return currentAns_;  // don't actually change the state
            //  })
            console.log("CORRECT ANSWER:", data);


            console.log('answer correct:', data === currentRadioValue);
            setPopupValue(data === currentRadioValue);
            // console.log('answer correct:', radioValue === correctAnswer);
            // setPopupValue(radioValue === correctAnswer);

            const timer = setTimeout(() => {

            }, 2000);
            return () => clearTimeout(timer);

        })

        socket.on("timer_count", (data) => {

            //console.log("timer arrived:", data)
            setTimerValue(data)
            //console.log("timerValue:", timerValue)
            if (timerValue === 1) { (console.log("timer_count active")) }
        })

        socket.on("somebody_voted", (data) => {
            console.log("somebody voted:", data)
            //will later be needed to show bigger bubbles sizes
        })

    }, [])


    return (
        <>
        {
            (showRanking === true && ranking !== null )? 
            <Ranking ranking={ranking} final={final}/>
            : 
            <div className="question-wrapper">



            <div className="question-item">
                <div className="timer">
                    {timerValue}
                    { showTimerXY ? <Timer initialTime={10} onEnd={() => console.log('hoo')}/> : null}

                </div>

                <Bubble className="bubble-button--question">{question}
                </Bubble>

            </div>

            {answer.map((item, index) => {

                if (item === null) {
                    return null;
                }
                return <div key={item} className={cssClasses[index]}>
                    <input type="radio" id={item} name="fav_language" value={item} checked={radioValue === item} onChange={() => sendVote(item)} />
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
        }</>
        
    )
};
export default Question;
