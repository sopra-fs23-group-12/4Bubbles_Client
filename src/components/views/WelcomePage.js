import React from 'react';
import {useHistory} from 'react-router-dom';
import 'styles/views/WelcomePage.scss';
import BaseContainer from "components/ui/BaseContainer";

import { Bubble } from 'components/ui/Bubble';
import { Button } from 'components/ui/Button';
import logoutRequest from "../../helpers/axios";
/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */

const WelcomePage = props => {

    const currentUser = localStorage.getItem('userId');

    const history = useHistory();

    // const doFriendList = () =>{
    //     history.push('/friendlist')
    // }

    const logout = () => {
        logoutRequest(history);
        localStorage.clear();
        history.push('/login');
    }


    const doStartNewGame = () =>{
        history.push('/gameroom')

    }


    const doJoinGame = () =>{
        history.push('/joingame')

    }

    const doViewMyProfile = (currentUser) =>{
        history.push (`profile/` + currentUser)
    }

    return (
        <BaseContainer>
            <div className="welcomepage-container">
                <h1>4Bubbles</h1>

                <div className="welcomepage-bubbles">
                    <div className="welcomepage button-container-upper-left">
                        <Bubble onClick={() => doStartNewGame()}>start new game</Bubble>
                    </div>

                    <div className="welcomepage button-container-upper-right">
                        <Bubble onClick={() => doJoinGame()}>join game</Bubble>
                    </div>

                    <div className="welcomepage button-container-lower-left">
                        <Bubble onClick={() => doViewMyProfile(currentUser)}>view my profile</Bubble>
                    </div>

                    {/* <div className="welcomepage button-container-lower-right">
                        <Bubble onClick={() => doFriendList()}>access my<br /> friends list</Bubble>
                    </div> */}
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