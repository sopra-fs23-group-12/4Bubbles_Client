import React, { useState } from 'react';
import '../../styles/ui/pop-up-alert.scss';

export default function PopUpAlert(props) {
  const [showPopUp, setShowPopup] = useState(true);
  return showPopUp === true ? (
    <div className="pop-up pop-up-alert">
      <div className="pop-up__container">
        <span>Please rotate your phone, it is better to play the game in landscape mode. 🔁</span>
        <button onClick={() => setShowPopup(false)} className="primary-button">ok</button>
      </div>
    </div>
  ) : null;
}