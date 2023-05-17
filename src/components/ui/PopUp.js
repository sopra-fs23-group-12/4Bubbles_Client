

import React from 'react'
import '../../styles/ui/pop-up-alert.scss';

export default function PopUpAlert(props) {
    return (
        <div className="pop-up pop-up-alert">
            <div className="pop-up__container">
                <span>Please rotate your phone, it is better to play the game in landscape mode. 🔁</span>
                {/* <button onClick={nextQuestion} className="primary-button">ok</button> */}
            </div>
        </div >

    )
}
