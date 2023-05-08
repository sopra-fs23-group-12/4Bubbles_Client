import React, { useState } from 'react';
import { Button } from 'components/ui/Button';
import { useHistory } from 'react-router-dom';

import '../../styles/views/Ranking.scss';

const RankingItem = (props) => {
    const { name, points, index } = props;

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
