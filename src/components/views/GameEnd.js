
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Profile.scss";
import LeaderLeftPopUp from 'components/ui/LeaderLeftPopUp';
import { useLocation } from 'react-router-dom';



const GameEnd = (props) => {

  const data = useLocation();

  /*
  localStorage.removeItem('gameMode');
  localStorage.removeItem('dataState');
  localStorage.removeItem('roomCode');
  localStorage.removeItem('isLeader');
  localStorage.removeItem('numberOfPlayers');
  localStorage.removeItem('users');*/

  return (
    <BaseContainer className="login form container">
      <LeaderLeftPopUp state={data.state}/>
    </BaseContainer>
  );
}

export default GameEnd;
