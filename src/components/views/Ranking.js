import React, { useEffect, useState } from 'react';
import { Button } from 'components/ui/Button';
import { useHistory } from 'react-router-dom';
import { headers } from 'helpers/api';
import { api } from 'helpers/api';

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

    const jsObjects = JSON.parse(localStorage.getItem('users'));

    let sortable = [];
    for (let user in ranking[0]) {
        sortable.push([user, ranking[0][user]]);
    }

    sortable.sort(function (a, b) {
        return b[1] - a[1];
    });

    //console.log(sortable);

    const tmpUsers = sortable.map((item, i) => {
        //console.log(item);
        let id = item[0];
        let result = jsObjects.filter(obj => {
            //console.log(obj)
            return obj.id === parseInt(item)
        })
        return { "name": result[0].username, "points": ranking[0][id] };
    })

    // eslint-disable-next-line
    const [users, setUsers] = useState(tmpUsers);


    const setStatistics = async () => {
        if (final) {
            const data = {
                "id": localStorage.getItem("userId"),
                "points": ranking[0][localStorage.getItem("userId")],
                headers
            }
            try {
                const response = await api.put('/users/Statistics/', data, headers());
                //console.log("set statistics");

            } catch (error) {
                console.log(error);
            }
        }


    }

    useEffect(() => {
        setStatistics();
    }, [])


    const printRanking = (users) => {
        let rank = 0;

        return users.map((item, i) => {
            // eslint-disable-next-line
            if (i === 0 || (i > 0 & item.points !== users[i - 1].points)) {
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
