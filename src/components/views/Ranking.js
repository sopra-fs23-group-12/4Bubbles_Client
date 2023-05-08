import React, { useEffect, useState, useMemo } from 'react';
import { Button } from 'components/ui/Button';
import { useHistory } from 'react-router-dom';
import io from "socket.io-client";
import { format } from 'react-string-format';
import { getDomainSocket } from "../../helpers/getDomainSocket";

import '../../styles/views/Ranking.scss';

const RankingItem = (props) => {
    const { name, points, index } = props;

    const medalEmojis = [
        "🥇",
        "🥈",
        "🥉"
    ]

    const printPosition = (index) => {
        if (index < 4) {
            return medalEmojis[index - 1];
        } else {
            return index + ".";
        }
    }
    return (
        <div className="ranking-item">
            <div className="ranking-item__left">
                {name}
            </div>
            <div className="ranking-item__right">
                <span>{points}</span><span>{printPosition(index)}</span>
            </div>
        </div>)
}


export default function Ranking(props) {
    const { final, ranking } = props;
    const history = useHistory();
    const [roomCode, setRoom] = useState("1");

    //console.log(final);

    /*
    const tmpUsers = ranking.map((item, i) => {
        console.log(item);
        let id = Object.keys(item)[0];
        console.log({"name": id, "points": item[id]})
        return {"name": id, "points": item[id]};
    })*/

    const jsObjects = JSON.parse(localStorage.getItem('users'));

    const tmpUsers = Object.keys(ranking[0]).map((item, i) => {
        let id = item;
        let result = jsObjects.filter(obj => {
            console.log(obj)
            return obj.id === parseInt(item)
          })
        return {"name": result[0].username, "points": ranking[0][id]};
    })

 
    const [users, setUsers] = useState(tmpUsers);

/*
    //add the url of the backend to make the connection to the server (getDomainSocket returns the URL of the server depending on prod or dev environment)
    const url = format(getDomainSocket() + "?roomCode={0}", roomCode);
    //const socket = useMemo(() => io.connect(url, { transports: ['websocket'], upgrade: false, roomCode: roomCode }), []);
    const socket = io.connect(url, { transports: ['websocket'], upgrade: false, roomCode: roomCode });

    useEffect(() => {
        socket.on("get_ranking", (data) => {
            // console.log("ranking message received:")
            // console.log(data.message)
            setUsers(data.message);
        })


    }, []);*/


    const printRanking = (users) => {
        let rank = 0;

        return users.map((item, i) => {
            if(i === 0 || (i > 0 & item.points !== users[i - 1].points)) {
                rank += 1;
            }

            return <RankingItem
                key={item.name}
                name={item.name}
                points={item.points}
                index={rank} />
                ;
        })
    }

    return (
        <div className="ranking-page">
            {!final ? <div className="exit-button" onClick={() => history.push('/welcomepage')}>exit</div> : null}

            <h1>{final ? "🏁 final ranking 🏁" : "intermediate ranking 🔥"}</h1>
            <div className="ranking-wrapper">

                {users ? printRanking(users) : null}
            </div>


            {!final ?

/*
                <div className="align-center">
                    <Button
                        onClick={() => history.push('/question')}
                        className="primary-button__continue"
                    >continue
                    </Button>
                </div>*/
                null
                :
                <div className="align-center">
                    <Button
                        onClick={() => history.push('/gameroom')}
                        className="primary-button__continue"
                    >play again
                    </Button>
                    <Button
                        onClick={() => history.push('/welcomepage')}
                        className="primary-button__continue"
                    >exit
                    </Button>
                </div>

            }


        </div >


    )
}
