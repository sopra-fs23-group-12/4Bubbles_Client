import React, { useEffect, useState } from 'react';
import { Button } from 'components/ui/Button';
import { useHistory } from 'react-router-dom';
import io from "socket.io-client";
import { format } from 'react-string-format';
import { getDomainSocket } from "../../helpers/getDomainSocket";

import '../../styles/views/Ranking.scss';

const RankingItem = (props) => {
    const { name, points, index, ranking } = props;

    const medalEmojis = [
        "🥇",
        "🥈",
        "🥉"
    ]

    const printPosition = (index) => {
        if (index < 3) {
            return medalEmojis[index];
        } else {
            return index + 1 + ".";
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

    console.log(final);

    /*
    const tmpUsers = ranking.map((item, i) => {
        console.log(item);
        let id = Object.keys(item)[0];
        console.log({"name": id, "points": item[id]})
        return {"name": id, "points": item[id]};
    })*/

    const tmpUsers = Object.keys(ranking[0]).map((item, i) => {
        console.log(item);
        let id = item;
        console.log({"name": id, "points": ranking[0][id]})
        return {"name": id, "points": ranking[0][id]};
    })

    /*
    const tmpUsers = [
        {
            "name": "user123",
            "points": 97
        },
        {
            "name": "edith6",
            "points": 96
        },
        {
            "name": "leonie20",
            "points": 83
        },
        {
            "name": "bubblebo",
            "points": 55
        },
        {
            "name": "judith5",
            "points": 34
        },
    ];
*/
    const [users, setUsers] = useState(tmpUsers);


    //add the url of the backend to make the connection to the server (getDomainSocket returns the URL of the server depending on prod or dev environment)
    const url = format(getDomainSocket() + "?roomCode={0}", roomCode);
    const socket = io.connect(url, { transports: ['websocket'], upgrade: false, roomCode: roomCode });

    useEffect(() => {
        socket.on("get_ranking", (data) => {
            console.log("ranking message received:")
            console.log(data.message)
            setUsers(data.message);
        })


    }, []);

    return (
        <div className="ranking-page">
            {!final ? <div className="exit-button" onClick={() => history.push('/welcomepage')}>exit</div> : null}

            <h1>{final ? "🏁 final ranking 🏁" : "intermediate ranking 🔥"}</h1>
            <div className="ranking-wrapper">
                {users ? users.map((item, i) => {
                    return <RankingItem
                        key={item.name}
                        name={item.name}
                        points={item.points}
                        index={i} />
                        ;
                }) : null}
            </div>


            {!final ?

                <div className="align-center">
                    <Button
                        onClick={() => history.push('/question')}
                        className="primary-button__continue"
                    >continue
                    </Button>
                </div>
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
