import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import 'styles/views/WelcomePage.scss';
import BaseContainer from "components/ui/BaseContainer";

import { Bubble } from 'components/ui/Bubble';
import { Button } from 'components/ui/Button';
import logoutRequest from "../../helpers/axios";
import {api, handleError} from "../../helpers/api";
import User from "../../models/User";
/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */


const doSubmit = () => {
    console.log("submit")
}

const WelcomePage = props => {


    const [user, setUser] = useState(null);
    const currentUser = localStorage.getItem('userId');


    const history = useHistory();
    const doFriendList = () =>{
        history.push('/friendlist')
    }

    const logout = () => {
        logoutRequest(history);
    }


    const doStartNewGame = () =>{
        history.push('/gameroom')

    }


    const doJoinGame = () =>{
        history.push('/joingame')

    }

    const doViewMyProfile = (user) =>{
        history.push ("profile/" + user.id)
    }

    //not needed code
    /* useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const headers = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
                const response = await api.get('/users/' + currentUser, headers);

                // Get the returned user and update a new object.

                const user = new User(response.data);
                setUser(user);

                console.log(user.id);
            }
            catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
                window.localStorage.removeItem("token");

            }
        }fetchData();
    }, []); */



    return (
        <BaseContainer>
            <div className="welcomepage-container">
                <h1>4Bubbles</h1>

                <div className="welcomepage-bubbles">
                    <div className="welcomepage button-container-left">
                        <Bubble onClick={() => doStartNewGame()}>start new game</Bubble>
                    </div>

                    <div className="welcomepage button-container-right">
                        <Bubble onClick={() => doJoinGame()}>join game</Bubble>
                    </div>

                    <div className="welcomepage button-container-left">
                        <Bubble onClick={() => doViewMyProfile(user)}>view my profile</Bubble>
                    </div>

                    <div className="welcomepage button-container-right">
                        <Bubble onClick={() => doFriendList()}>access my<br /> friends list</Bubble>
                    </div>
                    <br/>
            </div>
            <div >
                <Button
                    width="100%"
                    onClick={logout}
                >Logout
                </Button>
            </div>

        </div>
            <div className="login sopra-text">
                by sopra 2023
            </div>
        </BaseContainer>
    );
}

export default WelcomePage;