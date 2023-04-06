import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "components/routing/routeProtectors/GameGuard";
import { LoginGuard } from "components/routing/routeProtectors/LoginGuard";
import Login from "components/views/Login";
import Register from "components/views/Register";
import Dashboard from "components/views/Dashboard";
import ShowProfile from "components/views/ShowProfile";
import EditProfile from "components/views/EditProfile";
import WelcomePage from "../../views/WelcomePage";
import GameRoom from "components/views/GameRoom";
import WaitingRoom from "components/views/WaitingRoom";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/Game.scss".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /Game.scss renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/welcomepage">
            <WelcomePage />
        </Route>
        <Route path="/gameroom">
          <GameRoom />
        </Route>
        <Route path="/waitingroom">
          <WaitingRoom />
        </Route>
        <Route path="/joinRoom">
          <GameGuard>
            <JoinGameRoom />
          </GameGuard>
        </Route>
        <Route path="/profile/:id/edit">
          <GameGuard>
            <EditProfile edit={true} />
          </GameGuard>
        </Route>
        <Route path="/profile/:id">
          <GameGuard>
            <ShowProfile />
          </GameGuard>
        </Route>
        <Route exact path="/login">
          <LoginGuard>
            <Login />
          </LoginGuard>
        </Route>
        <Route exact path="/register">
          <LoginGuard>
            <Register />
          </LoginGuard>
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

/*
* Don't forget to export your component!
 */
export default AppRouter;
