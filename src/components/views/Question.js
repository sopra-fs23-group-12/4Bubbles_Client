import React from 'react';
import { Bubble } from 'components/ui/Bubble';

import '../../styles/views/Question.scss';

export default function Question() {
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
    return (
        <div className="question-wrapper">
            <div className="question-item">
                <Bubble className="bubble-button--question">{question}</Bubble>
            </div>
            {answer.map((item, index) => {
                return <div key={index} className={cssClasses[index]}>
                    <input type="radio" id={item} name="fav_language" value={item} />
                    <label htmlFor={item}>
                        <Bubble className="bubble-button--answer">{item}</Bubble>
                    </label>
                </div>
            })}
        </div>
    )
}