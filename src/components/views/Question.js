import { useSocket } from 'components/context/socket';
import { Bubble } from 'components/ui/Bubble';
import React, { useEffect, useState } from 'react';
import '../../styles/views/Question.scss';
import Ranking from './Ranking';
import { useHistory } from 'react-router-dom';
import {format} from "react-string-format";
import {getDomainSocket} from "../../helpers/getDomainSocket";

const Question = props => {

    const [correctAnswer, setCorrectAnswer] = useState(null);

    const [popupValue, setPopupValue] = useState(null);
    const [radioValue, setRadioValue] = useState(null);
    const [timerValue, setTimerValue] = useState(null);
    const [question, setQuestionValue] = useState(null);
    const [answers, setAnswersValue] = useState(null);
    const [answer1, setAnswer1Value] = useState(null);
    const [answer2, setAnswer2Value] = useState(null);
    const [answer3, setAnswer3Value] = useState(null);
    const [answer4, setAnswer4Value] = useState(null);
    const [votingArray, setVotingArray] = useState(null);
    const [bubbleSize1, setBubbleSize1] = useState(0);
    const [bubbleSize2, setBubbleSize2] = useState(0);
    const [bubbleSize3, setBubbleSize3] = useState(0);
    const [bubbleSize4, setBubbleSize4] = useState(0);
    const [showRanking, setShowRanking] = useState(false);
    const [ranking, setRanking] = useState(null);
    const [final, setFinal] = useState(false);
    const [visibleAnswers, setVisibleAnswers] = useState(false);
    const [splash, setSplash] = useState(false);
    const [alreadyVoted, setAlreadyVoted] = useState(false);
    const { socket, connect } = useSocket();
    const userId = localStorage.getItem("userId");
    const bearerToken = localStorage.getItem("token");
    const history = useHistory();


    const roomCode = localStorage.roomCode
    const gameMode = localStorage.gameMode
    const numberOfPlayers = (Number(localStorage.numberOfPlayers))

    const answer = [
        localStorage.getItem("answer1"),
        localStorage.getItem("answer2"),
        localStorage.getItem("answer3"),
        localStorage.getItem("answer4")
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


    const updateRanking = () =>{
        setShowRanking(localStorage.getItem("showRanking") === "true");
        console.log("show ranking:", showRanking);
    }

    const updateQuestionBubble = () =>{
        setQuestionValue(localStorage.getItem("question"));
    }

    const updateAnswerBubbles = () => {
        setAnswer1Value(localStorage.getItem("answer1"))
        setAnswer2Value(localStorage.getItem("answer2"))
        setAnswer3Value(localStorage.getItem("answer3"))
        setAnswer4Value(localStorage.getItem("answer4"))

        if (localStorage.getItem("AnswerVisible") === "true") {
            setVisibleAnswers(true);
        }else {
            setVisibleAnswers(false);
        }

    }

    const updateCorrectAnswer = () => {
        setCorrectAnswer(localStorage.getItem("correctAnswer"));
    }

    const updateBubbleSize = () =>{
        setBubbleSize1(0);
        setBubbleSize2(0);
        setBubbleSize3(0);
        setBubbleSize4(0);

        if (votingArray !== null) {
            for (let i = 0; i < votingArray.length - 1; i = i + 2) {
                console.log("votingArray: " + votingArray)
                console.log("answer1: " + answer1 + " answer2: " + answer2 + " answer3: " + answer3 + " answer4: " + answer4)
                console.log("answer: " + answer)
                console.log("answers: " + answers)
                if (votingArray[i] === answer1) {
                    setBubbleSize1(votingArray[i + 1])
                }
                else if (votingArray[i] === answer2) {
                    setBubbleSize2(votingArray[i + 1])
                }
                else if (votingArray[i] === answer3) {
                    setBubbleSize3(votingArray[i + 1])
                }
                else if (votingArray[i] === answer4) {
                    setBubbleSize4(votingArray[i + 1])
                }
                console.log("bubbleSize1: " + bubbleSize1 + " bubbleSize2: " + bubbleSize2 + " bubbleSize3: " + bubbleSize3 + " bubbleSize4: " + bubbleSize4)
            }
        }
    }

    const sendVote = (item) => {

        if (alreadyVoted === false || gameMode !== "standard") {
            setRadioValue(item)

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

    const updateSocketConnection = () =>{
        // join websocket connection again, since there was a disconnect when the push to /waitingroom happened
        const roomCode = localStorage.getItem("roomCode");
        const url = format(getDomainSocket() + "?roomCode={0}", roomCode);
        connect(url, { transports: ['websocket'], upgrade: false, roomCode: roomCode })

        console.log("socket connected in updateSocket: ", socket.connected);

    }
    useEffect(() => {
        updateSocketConnection();
        updateBubbleSize();
        updateAnswerBubbles();
        updateCorrectAnswer();
        updateQuestionBubble();
        updateRanking();


    });

    useEffect(() => {


        socket.emit('join_room', {
            userId: userId,
            bearerToken: bearerToken,
            roomCode: roomCode,
            type: "CLIENT"
        })

        console.log("socket acknowledged as connected in useEffect:", socket.connected);



        //everytime an event happens triggered by the socket, this function is called
        socket.on("get_question", (data) => {
            console.log("question arrived:", data)
            localStorage.setItem("question", data);
            setQuestionValue(data);
            localStorage.setItem("showRanking", "false")
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
            localStorage.setItem("showRanking", "true");
            setShowRanking(true);
            setVotingArray(null);
            setBubbleSize1(0);
            setBubbleSize2(0);
            setBubbleSize3(0);
            setBubbleSize4(0);
            localStorage.setItem("AnswerVisible", "false")
        })

        socket.on("get_answers", (data) => {


            localStorage.setItem("answer1", data[0]);
            localStorage.setItem("answer2", data[1]);
            localStorage.setItem("answer3", data[2]);
            localStorage.setItem("answer4", data[3]);
            localStorage.setItem("answerData", data);

            setAnswer1Value(data[0])
            setAnswer2Value(data[1])
            setAnswer3Value(data[2])
            setAnswer4Value(data[3])
            setAnswersValue(data)
            console.log("answers arrived:", data)
        })

        socket.on("end_of_question", (data) => {
            setSplash(true);
            let seconds = 5;
            const interval = setInterval(() => {
                seconds = seconds - 1;
                if (seconds <= 3) {
                    setPopupValue(true);

                }

                if (seconds ===  0) {
                    setVisibleAnswers(false);
                    localStorage.setItem("AnswerVisible", "false")
                    setSplash(false);
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

            localStorage.removeItem("answerData");
            localStorage.removeItem("answer0");
            localStorage.removeItem("answer1");
            localStorage.removeItem("answer2");
            localStorage.removeItem("answer3");
            localStorage.removeItem("question");
        });

        socket.on("get_right_answer", (data) => {
            console.log("right answer arrived:", data)
            localStorage.setItem("correctAnswer", data);
            setCorrectAnswer(data)
        })

        socket.on("timer_count", (data) => {
            updateBubbleSize();
            setTimerValue(data)
            if (data === 10) {
                setVisibleAnswers(true);
                localStorage.setItem("AnswerVisible", "true");
            }

            let currentvisibleAnswer;
            setVisibleAnswers(currentState_ => {
                currentvisibleAnswer = currentState_;
                return currentState_;  // don't actually change the state
            })

            if (data === 1 && currentvisibleAnswer === true) {
                setSplash(true);
            }
            console.log("timer: ", data);
        })

        //to adjust the bigger bubble sizes
        socket.on("somebody_voted", (data) => {
            console.log("somebody voted:", data)

            let stringvalue = null;
            let intkey = null;
            const array = [];
            let i = 0;

            for (let value in data){
                console.log( "value: " + value.toString() + " , amountOfVotes: " + data[value]) ;
                stringvalue = value.toString();
                intkey = parseInt(data[value])
                console.log("strigvalue " + stringvalue + typeof stringvalue)
                console.log("intkey " +intkey + typeof intkey)
                array[i] = stringvalue;
                array[i+1] = intkey;
                i = i+2;
            }
            setVotingArray(array);
        })


    }, [roomCode]);

    const exit = () =>{

        console.log("exit button clicked")

        localStorage.removeItem("answerData");
        localStorage.removeItem("answer1");
        localStorage.removeItem("answer2");
        localStorage.removeItem("answer3");
        localStorage.removeItem("answer4");
        localStorage.removeItem("question");
        localStorage.removeItem("correctAnswer");
        localStorage.setItem("AnswerVisible", "false");
        localStorage.setItem("showRanking", "false");

        history.push('/welcomepage');
    }

    return (
        <>
            {
                (showRanking === true && ranking !== null) ?
                    <Ranking ranking={ranking} final={final} />
                    :

                    <div className="question-wrapper">

                        <div className="exit-button" onClick={ () => exit() } >exit</div>
                        {/* question bubble */}
                        <div className="question-item">
                            <div className="timer">
                                {timerValue}
                            </div>
                            <Bubble
                                className="bubble-button--question">{question}
                            </Bubble>
                        </div>


                            <div className="exit-button" onClick={ () => exit() } >exit</div>

                            {/* 4 answer bubbles */}
                            {answer.map((item, index, size) => {

                                    if (item === null || visibleAnswers === false) {
                                        return null;
                                    }

                                    if (splash === false) {
                                        return <div key={item} className={cssClasses[index]}>
                                            <input type="radio" id={item} name={index} value={item} checked={radioValue === item} onChange={() => sendVote(item)} />
                                            <label htmlFor={item}>
                                                <div>
                                                    < Bubble style={{ width: ((bubbleSize[index]*50/numberOfPlayers + 50)+"%")}} id={cssClasses[index]}  className="bubble-button--answer">{item}</Bubble>
                                                </div>
                                            </label>
                                        </div>
                                    }
                                    return <div key={item} className={cssClasses[index]}>
                                        <input type="radio" id={item} name="fav_language" value={item} checked={radioValue === item} onChange={() => sendVote(item)} />
                                        <label htmlFor={item}>
                                            <Bubble style={{ width: ((100)+"%")}} id={cssClasses[index]} className={(correctAnswer === null || item === correctAnswer) ? "bubble-button--answer" : "bubble-button--splashed bubble-button--answer"}>{item}</Bubble>
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
