import React, { useState } from 'react';
import '../../styles/ui/pop-up-alert.scss';
import { useHistory } from 'react-router-dom';

export default function LeaderLeftPopUp(props) {
  const {state} = props;
  const history = useHistory();
  return  (
    <div className="pop-up pop-up-leader-left">
      <div className="pop-up__container">
        <span>{state === 'user_left' ? 'Oups. You reloaded the page and left the game.' : 'The Leader left the Game. Game is over...'}</span>
        <button onClick={() => history.push('/welcomepage')} className="primary-button">ok</button>
      </div>
    </div>
  );
}