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
    return (
        <div className="question-wrapper">
            <div className="question-item">
                <Bubble className="bubble-button--question">{question}</Bubble>
            </div>
            <div className="answer-item-top-left">
                <Bubble className="bubble-button--answer">{answer[0]}</Bubble>
            </div>
            <div className="answer-item-top-right">
                <Bubble className="bubble-button--answer">{answer[1]}</Bubble>
            </div>
            <div className="answer-item-bottom-right">
                <Bubble className="bubble-button--answer">{answer[2]}</Bubble>

            </div>
            <div className="answer-item-bottom-left">
                <Bubble className="bubble-button--answer">{answer[3]}</Bubble>
            </div>
        </div>
    )
}
