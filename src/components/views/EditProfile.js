import { useEffect, useState } from 'react';
import { api, handleError } from 'helpers/api';
import { Spinner } from 'components/ui/Spinner';
import { Button } from 'components/ui/Button';
import { useHistory } from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import User from 'models/User';
import { useParams } from 'react-router-dom';

const FormField = props => {
  return (
    <div className="login field">
      <label className="login label">
        {props.label}
      </label>
      <input
        className="login input"
        placeholder={props.placeholder}
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};

const EditProfile = (props) => {
  // use react-router-dom's hook to access the history
  const history = useHistory();
  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://reactjs.org/docs/hooks-state.html
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState("");
  const currentUser = localStorage.getItem('userId');



  let { id } = useParams();

  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {

        const response = await api.get('/users/' + id);

        setUser(response.data[0]);
        setUsername(response.data[0].username);

        if (response.data[0].birthday != null) {
          let birthday = new Date(response.data[0].birthday)
          birthday = birthday.toLocaleDateString('de-DE', { year: 'numeric', month: 'numeric', day: 'numeric' })
          setBirthday(birthday);
        }

      } catch (error) {
        console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
        console.error("Details:", error);
        alert("Something went wrong while fetching the users! See the console for details.");
      }
    }

    fetchData();
  }, []);

  const doUpdate = async () => {

    try {
      let requestBody;
      if (birthday != '') {
        requestBody = JSON.stringify({ username, birthday });

      } else {
        requestBody = JSON.stringify({ username });

      }
      const response = await api.put('/users/' + id, requestBody);
      console.log(response.status);
      setError("Yey, you updated your profile!");


    } catch (error) {
      //alert(`Something went wrong during the login: \n${handleError(error)}`);
      setError("Oups, something went wrong!");
    }
  };

  let content = <Spinner />;


  if (user) {

    content = (
      <div className="game">
        <FormField
          label="Username"
          value={username}
          onChange={un => setUsername(un)}
        />
        <FormField
          label="Birthdate"
          value={birthday}
          placeholder={"dd.mm.yyyy"}
          onChange={bd => setBirthday(bd)}
        />
        {error ? <div className="error-msg">{error}</div> : null}

        <div className="login button-container">
          <Button
            onClick={() => doUpdate()}
            width="100%"
          >
            Save
          </Button>
        </div>
        <div className="login button-container">
          <Button
            onClick={() => history.push(`/overview`)}
            width="100%"
          >
            Back to overview
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

export default EditProfile;
