import { useEffect, useState } from 'react';
import { api, handleError, headers } from 'helpers/api';
import { Spinner } from 'components/ui/Spinner';
import { Button } from 'components/ui/Button';
import { useHistory, useParams } from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Profile.scss";
import User from 'models/User';

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
  const currentUser = localStorage.getItem('userId');



  let { id } = useParams();

  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
        const response = await api.get('/users/' + id, headers);

        // Get the returned user and update a new object.

        const user = new User(response.data);

        console.log(user.id);
        // delays continuous execution of an async operation for 1 second.
        // This is just a fake async call, so that the spinner can be displayed
        // feel free to remove it :)
        //await new Promise(resolve => setTimeout(resolve, 1000));

        // Get the returned users and update the state.
        setUser(response.data[0]);


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
  }, [id]);

  let content = <Spinner />;


  if (user) {

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    let creationDate = new Date(user.creationDate)
    let birthdate = null;
    if (user.birthday != null) {
      birthdate = new Date(user.birthday)
    }

    content = (
      <div className="profile-page-wrapper">

        <div className ="username"> 
        {user.username}
        </div>

        <div className = "info" >
        overall ranking: 
        <div className = "infoBox"> ranking </div>
        </div>

        <div className = "info" >
        points scored: 
        <div className = "infoBox"> points </div>
        </div>

        <div className = "info" >
        games played: 
        <div className = "infoBox"> games </div>
        </div>

        <div>
          Creation Date: 
          <br/>{creationDate.toLocaleDateString('de-DE', options)}</div>
        {/* <div>Birthday: {birthdate ? birthdate.toLocaleDateString('de-DE', options) : "-"}</div> */}
        <div>Status: {user.status}</div>

        {/* {id === currentUser ?
          <div className="login button-container">
            <Button
              onClick={() => history.push(`/profile/` + id + `/edit`)}
              width="100%"
            >
              Edit profile
            </Button>
          </div> : null} */}

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
