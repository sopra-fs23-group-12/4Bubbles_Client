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
    const [visibleAnswers, setVisibleAnswers] = useState(false);
    const [splash, setSplash] = useState(false);

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

        // setPopupValue(null);
        // setCorrectAnswer(null);
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

      function displayEndOfQuestion(seconds) {
        setSplash(true);
        const interval = setInterval(() => {
            seconds = seconds -1;
            if (seconds <= 3) {
                console.log("end of question arrived:", data)
                console.log("RADIOVALUE:", radioValue);
                console.log("CORRECT ANSWER:", correctAnswer);
                setPopupValue(correctAnswer === radioValue);
    
                socket.emit('end_of_question', {
                    message: "",
                    roomCode: roomCode,
                })
                
            }

          if (seconds ===  0) {
            setVisibleAnswers(false);
            setSplash(false);
            console.log("delay for request_ranking");
            socket.emit('request_ranking', {
                userId: localStorage.userId,
                remainingTime: timerValue,
                roomCode: roomCode,
                type: "CLIENT"
            });
            clearInterval(interval);
          }
        }, 1000);

      }




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
            setPopupValue(null);
        })

        socket.on("get_answers", (data) => {
            setAnswer1Value(data[0])
            setAnswer2Value(data[1])
            setAnswer3Value(data[2])
            setAnswer4Value(data[3])
            console.log("answers arrived:", data)
        })

        socket.on("end_of_question", (data) => {
            displayEndOfQuestion(4);
            // setTimeout(() => {
            //     setSplash(true);
            //     setTimerValue(data);
            // }, 1000);
            
            // //setSplash(true);
            // setTimeout(() => {
            //     // console.log("end of question arrived:", data)
            //     // console.log("RADIOVALUE:", radioValue);
            //     // console.log("CORRECT ANSWER:", correctAnswer);
            //     // setPopupValue(correctAnswer === radioValue);
    
            //     // socket.emit('end_of_question', {
            //     //     message: "",
            //     //     roomCode: roomCode,
            //     // })


            //     setTimeout(() => {
            //         console.log("delay for request_ranking");
            //         socket.emit('request_ranking', {
            //             userId: localStorage.userId,
            //             remainingTime: timerValue,
            //             roomCode: roomCode,
            //             type: "CLIENT"
            //         });
            //     }, 2000);

                
            // },2000)

            //setSplash(false);
            //setVisibleAnswers(false);
        });

        socket.on("get_right_answer", (data) => {
            console.log("right answer arrived:", data)
            setCorrectAnswer(data)
            //var currentRadioValue;
            // setRadioValue(currentState_ => {
            //     currentRadioValue = currentState_;
            //     return currentState_;  // don't actually change the state
            //  })
            

            // var currentCorrectAnswer;
            // setCorrectAnswer(currentAns_ => {
            //     currentCorrectAnswer = currentAns_;
            //     return currentAns_;  // don't actually change the state
            //  })
            
            //console.log('answer correct:', data === currentRadioValue);
            

        })

        socket.on("timer_count", (data) => {

            console.log("timer arrived:", data)
            setTimerValue(data)
            if (data === 10) {
                setVisibleAnswers(true);
            }


            var currentvisibleAnswer;
            setVisibleAnswers(currentState_ => {
                currentvisibleAnswer= currentState_;
                return currentState_;  // don't actually change the state
             })


            console.log("visibleanswer:", currentvisibleAnswer)

            if (data === 1 && currentvisibleAnswer === true) {
                setSplash(true);
            }
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

            {/* question bubble */}
            <div className="question-item">
                <div className="timer">
                    {timerValue}
                    {/* { showTimerXY ? <Timer initialTime={10} onEnd={() => console.log('hoo')}/> : null} */}
                </div>
                <Bubble 
                className="bubble-button--question">{question}
                </Bubble>
            </div>

            {/* 4 answer bubbles */}
 
            {answer.map((item, index) => {
                if (item === null || visibleAnswers === false) {
                    return null;
                }
                if (splash === false) {
                    return <div key={item} className={cssClasses[index]}>
                        <input type="radio" id={item} name="fav_language" value={item} checked={radioValue === item} onChange={() => sendVote(item)} />
                        <label htmlFor={item}>
                            <Bubble className="bubble-button--answer">{item}</Bubble>
                        </label>
                    </div>
                }
                return <div key={item} className={cssClasses[index]}>
                    <input type="radio" id={item} name="fav_language" value={item} checked={radioValue === item} onChange={() => sendVote(item)} />
                    <label htmlFor={item}>
                        <Bubble className={(correctAnswer === null || index === correctAnswer) ? "bubble-button--answer" : "bubble-button--splashed bubble-button--answer"}>{item}</Bubble>
                    </label>
                </div>
            })}

            {/* pop up window */}
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
