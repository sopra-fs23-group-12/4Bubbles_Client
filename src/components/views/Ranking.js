import React, { useEffect, useState } from 'react';
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
    const { final } = props;
    const [users, setUsers] = useState(null);
    const history = useHistory();

    useEffect(() => {
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

        setUsers(tmpUsers);
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
