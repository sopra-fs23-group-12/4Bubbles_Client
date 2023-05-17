import { useEffect, useState } from 'react';
import { api, handleError, headers } from 'helpers/api';
import { Spinner } from 'components/ui/Spinner';
import { Button } from 'components/ui/Button';
import { useHistory, useParams } from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Profile.scss";

const Player = ({ user }) => (
  <div className="player container">
    <div className="player username">{user.username}</div>
    <div className="player name">{user.name}</div>
    <div className="player id">id: {user.id}</div>
  </div>
);

Player.propTypes = {
  user: PropTypes.object
};


const ShowProfile = (props) => {
  // use react-router-dom's hook to access the history
  const history = useHistory();
  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://reactjs.org/docs/hooks-state.html
  const [user, setUser] = useState(null);


  let { id } = useParams();

  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
        const response = await api.get('/users/Statistics/' + id, headers());

        // Get the returned user and update a new object.

        setUser(response.data);

      } catch (error) {
        console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
        console.error("Details:", error);
        window.localStorage.removeItem("token");
      }
    }

    fetchData().catch(error => {
      console.error("Unhandled promise rejection:", error);
    });

  }, [id]);

  let content = <Spinner />;


  if (user) {

    content = (
      <div className="profile-page-wrapper">

        <div className ="username"> 
        {user.username}
        </div>

        <div className = "info" >
        points scored: 
        <div className = "infoBox"> { user ? user.totalPoints : "-"} </div>
        </div>

        <div className = "info" >
        games played: 
        <div className = "infoBox"> { user ? user.totalGamesPlayed : "-"} </div>
        </div>

        <div className="button">
          <Button
            onClick={() => history.push(`/welcomepage`)}
            width="100%"
          >Back 
          </Button>
        </div>

      </div>
    );
  }

  return (
    <BaseContainer className="login form container">
      {content}
    </BaseContainer>
  );
}

export default ShowProfile;
