import { useEffect, useState } from 'react';
import { api, handleError, headers } from 'helpers/api';
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
  // use react-router-dom's hook to access the history
  const history = useHistory();

  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://reactjs.org/docs/hooks-state.html

  // eslint-disable-next-line
  const [users, setUsers] = useState(null);

  const logout = () => {
    logoutRequest(history);
  }

  const joinRoom = () => {
    history.push("/joinRoom");
  }

  const createRoom = () => {
    history.push("/createRoom");
  }

  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
            const response = await api.get('/users', headers());

        // delays continuous execution of an async operation for 1 second.
        // This is just a fake async call, so that the spinner can be displayed
        // feel free to remove it :)
        //await new Promise(resolve => setTimeout(resolve, 1000));

        // Get the returned users and update the state.
        setUsers(response.data);

        // This is just some data for you to see what is available.
        // Feel free to remove it.
        console.log('request to:', response.request.responseURL);
        console.log('status code:', response.status);
        console.log('status text:', response.statusText);
        console.log('requested data:', response.data);

        // See here to get more data.
        console.log(response);
      } catch (error) {
        console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
        console.error("Details:", error);
        alert("Something went wrong while fetching the users! See the console for details.");
        window.localStorage.removeItem("token");

      }
    }
    fetchData();
  }, []);

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
