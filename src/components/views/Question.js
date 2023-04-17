import React, { useState } from 'react';
import { Bubble } from 'components/ui/Bubble';

import '../../styles/views/Question.scss';



export default function Question() {

    //websockets need to communicate:
    // timing
    // votes
    // questions (initial)
    // questions (reveal)
    // bubble sizes?

    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [popupValue, setPopupValue] = useState(null);
    const [radioValue, setRadioValue] = useState(null);

    const question = "Which river has the most capital cities on it?"
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
            console.log(radioValue === answer[0]);
            setPopupValue(radioValue === answer[0]);
        }, 2000);
        return () => clearTimeout(timer);
    }

    const nextQuestion = () => {
        setPopupValue(null);
        setCorrectAnswer(null);
    }

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
}
