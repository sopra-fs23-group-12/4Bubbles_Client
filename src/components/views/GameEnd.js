
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Profile.scss";
import LeaderLeftPopUp from 'components/ui/LeaderLeftPopUp';
import { useLocation } from 'react-router-dom';



const GameEnd = (props) => {

  const data = useLocation();

  return (
    <BaseContainer className="login form container">
      <LeaderLeftPopUp state={data.state}/>
    </BaseContainer>
  );
}

export default GameEnd;
