import { Bubble } from 'components/ui/Bubble';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/views/Question.scss';
import { useSocket } from 'components/context/socket';
import Ranking from './Ranking';

const Question = props => {

    //websockets need to communicate:
    // timing
    // votes
    // questions (initial)
    // questions (reveal)
    // bubble sizes?


    const [popupValue, setPopupValue] = useState(null);
    const [radioValue, setRadioValue] = useState(null);
    const [timerValue, setTimerValue] = useState(null);
    const [question, setQuestionValue] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [answer1, setAnswer1Value] = useState(null);
    const [answer2, setAnswer2Value] = useState(null);
    const [answer3, setAnswer3Value] = useState(null);
    const [answer4, setAnswer4Value] = useState(null);
    const [bubbleSize1, setBubbleSize1] = useState(1);
    const [bubbleSize2, setBubbleSize2] = useState(1);
    const [bubbleSize3, setBubbleSize3] = useState(1);
    const [bubbleSize4, setBubbleSize4] = useState(1);
    const [showRanking, setShowRanking] = useState(false);
    const [ranking, setRanking] = useState(null);
    const [final, setFinal] = useState(false);
    //const [showTimerXY, setShowTimerXY] = useState(false);
    const [visibleAnswers, setVisibleAnswers] = useState(false);
    const [splash, setSplash] = useState(false);
    const [alreadyVoted, setAlreadyVoted] = useState(false);
    const { socket } = useSocket();

    const data = useLocation();
    // console.log("data: ", data);
    // console.log("localStorage: ", localStorage);
    //console.log("roomCode: ", localStorage.roomCode);

    const roomCode = localStorage.roomCode
    const gameMode = localStorage.gameMode
    //console.log("gameMode: ", gameMode);

    // const url = format(getDomainSocket() + "?roomCode={0}", roomCode);

    //connect(url, { transports: ['websocket'], upgrade: false, roomCode: roomCode })


    const answer = [
        answer1,
        answer2,
        answer3,
        answer4
    ]

    const bubbleSize = [
        bubbleSize1,
        bubbleSize2,
        bubbleSize3,
        bubbleSize4
    ]

    const cssClasses = [
        "answer-item answer-item-top-left",
        "answer-item answer-item-top-right",
        "answer-item answer-item-bottom-right",
        "answer-item answer-item-bottom-left",
    ]

    const cssClassesBubble = [
        "answer-item answer-item-top-left-bubble-button",
        "answer-item answer-item-top-right-bubble-button",
        "answer-item answer-item-bottom-right-bubble-button",
        "answer-item answer-item-bottom-left-bubble-button",
    ]


    const sendVote = (item, index, size) => {
        //TODO
        //works:
        // var myButton = document.getElementById("answer-item answer-item-top-left");
        // console.log("index:", index);
        // console.log("myButton:", myButton);
        // myButton.style.transform = 'scale(2)';


        // let myButton = document.getElementById(cssClasses[index]);
        // console.log("myButton:", myButton);
        // myButton.style.transform = 'scale(2)';

        //myButton.style.height = '400px';
        //yButton.style.width= '400px';
        //myButton.scale(2)
        // var myButton2 = document.getElementById(item);
        // console.log("myButton2:", myButton2);
        //myButton.style.transform = 'scale(2)';

        // var myButton3 = document.getElementsByClassName("answer-item answer-item-bottom-right-bubble-button");
        // console.log("myButton3:", myButton3);
        // myButton3.style.transform = 'scale(2)';


        if (alreadyVoted === false || gameMode != "standard") {
            setRadioValue(item)
            // console.log("sendVote of:", item);
            // console.log("radioValue:", radioValue);

            socket.emit('send_vote', {
                userId: localStorage.userId,
                remainingTime: timerValue,
                message: item,
                roomCode: roomCode,
                type: "CLIENT"
            })
        }
        setAlreadyVoted(true);
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
            const rank = JSON.parse(data)['ranking'];
            const fin = JSON.parse(data)['final_round'][0];
    
            console.log(rank);
            setRanking(rank);
            setFinal(fin);
            setRadioValue(null);
            setPopupValue(null);
            setAlreadyVoted(false);
            setShowRanking(true);
        })

        socket.on("get_answers", (data) => {
            setAnswer1Value(data[0])
            setAnswer2Value(data[1])
            setAnswer3Value(data[2])
            setAnswer4Value(data[3])
            console.log("answers arrived:", data)
        })

        socket.on("end_of_question", (data) => {
            setSplash(true);
            let seconds = 5;
            const interval = setInterval(() => {
                seconds = seconds - 1;
                if (seconds <= 3) {
                    // please don't delete:
                    // var currentRadioValue;
                    // setRadioValue(currentState_ => {
                    //     currentRadioValue = currentState_;
                    //     return currentState_;  // don't actually change the state
                    //  })

                    setPopupValue(true);

                    socket.emit('end_of_question', {
                        message: "",
                        roomCode: roomCode,
                    })
                }
    
              if (seconds ===  0) {
                setVisibleAnswers(false);
                setSplash(false);
                console.log("delay for request_ranking");
                if(localStorage.getItem('isLeader')) {
                    socket.emit('request_ranking', {
                        userId: localStorage.userId,
                        remainingTime: timerValue,
                        roomCode: roomCode,
                        type: "CLIENT"
                    });
                }
                clearInterval(interval);
              }
            }, 1000);
        });

        socket.on("get_right_answer", (data) => {
            console.log("right answer arrived:", data)
            setCorrectAnswer(data)
        })

        socket.on("timer_count", (data) => {

            //console.log("timer arrived:", data)
            setTimerValue(data)
            if (data === 10) {
                setVisibleAnswers(true);
            }

            let currentvisibleAnswer;
            setVisibleAnswers(currentState_ => {
                currentvisibleAnswer = currentState_;
                return currentState_;  // don't actually change the state
            })

            //console.log("visibleanswer:", currentvisibleAnswer)

            if (data === 1 && currentvisibleAnswer === true) {
                setSplash(true);
            }
        })
        //to adjust the bigger bubble sizes
        socket.on("somebody_voted", (data) => {
            console.log("somebody voted:", data)
            console.log("answer: "+ answer);
            console.log("answer[0]: "+ answer[0]);
            console.log("answer1: "+ answer1);

            // var myButton = document.getElementById("answer-item-top-right");
            // console.log("myButton:", myButton);
            // myButton.style.transform = 'scale(2)';

            // var bubble2 = document.getElementById("answer-item-bottom-right");
            // console.log("bubble2:", bubble2);
            // bubble2.style.transform = 'scale(2)';

            //answer[1].scale(2);
            for (let value in data){
                console.log( "value: " + value + " , amountOfVotes: " + data[value]) ;
                if (value === answer1) {
                    console.log("answer1 === value: " + answer1);
                }
                if (value === answer2) {
                    console.log("answer2 === value: " + answer2);
                }
                if (value === answer3) {    
                    console.log("answer3 === value: " + answer3);
                }
                if (value === answer4) {
                    console.log("answer4 === value: " + answer4);
                }
            }
        })

        // eslint-disable-next-line
    }, [roomCode]);

    return (
        <>
            {
                (showRanking === true && ranking !== null) ?
                    <Ranking ranking={ranking} final={final} />
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

                        {/* 4 answer bubblesstyle={"img{height: 330px; width: 330px;"}style={{ width: "900px", height: "900px" }}  */}
                        {answer.map((item, index, size) => {

                            if (item === null || visibleAnswers === false) {
                                return null;
                            }

                            if (splash === false) {
                                return <div key={item} className={cssClasses[index]}>
                                    <input type="radio" id={item} name={index} value={item} checked={radioValue === item} onChange={() => sendVote(item, index, size + 1)} />
                                    <label htmlFor={item}>
                                    <div>
                                        < Bubble style={{ width: (index*50+ 100)+"px", height: (index*50+ 100)+"px"}} id={cssClasses[index]}  className="bubble-button--answer">{item}</Bubble>
                                    </div>
                                    </label>
                                </div>
                            }
                            return <div key={item} className={cssClasses[index]}>
                                <input type="radio" id={item} name="fav_language" value={item} checked={radioValue === item} onChange={() => sendVote(item)} />
                                <label htmlFor={item}>
                                    <Bubble id={cssClasses[index]} className={(correctAnswer === null || item === correctAnswer) ? "bubble-button--answer" : "bubble-button--splashed bubble-button--answer"}>{item}</Bubble>
                                </label>
                            </div>
                        }
                        )}

                        {/* pop up window */}
                        {(popupValue !== null) ?
                            <div className="pop-up">
                                <div className="pop-up__container">
                                    <span>{(correctAnswer === radioValue) ? 'Your answer was correct! ✌️' : 'Your answer was wrong... 😱'}</span>
                                    {/* <button onClick={nextQuestion} className="primary-button">ok</button> */}
                                </div>
                            </div >
                            : null
                        }
                    </div >
            }</>

    )
};
export default Question;
