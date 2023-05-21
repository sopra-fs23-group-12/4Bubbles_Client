import { Button } from 'components/ui/Button';
import { useHistory, Link } from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import logoutRequest from 'helpers/axios';
import { Bubble } from 'components/ui/Bubble';

const Player = ({ user }) => (
  <li id={user.id}>
    <Link to={"profile/" + user.id}>
      <div className="player container">
        <div className="player username">{user.username}</div>
        <div className="player name">status: {user.status}</div>
        <div className="player id">id: {user.id}</div>
      </div >
    </Link>
  </li>
);

Player.propTypes = {
  user: PropTypes.object
};

const Dashboard = () => {
  const history = useHistory();

  const logout = () => {
    logoutRequest(history);
  }

  const joinRoom = () => {
    history.push("/joinRoom");
  }

  const createRoom = () => {
    history.push("/createRoom");
  }

  return (
    <BaseContainer className="game container">
      <Bubble onClick={joinRoom}> Join Room</Bubble>
      <Bubble onClick={createRoom}> Create Room</Bubble>
      <Button
        width="20%"
        onClick={logout}
      >
        Logout
      </Button>
    </BaseContainer>
  );
}

export default Dashboard;
