import React from 'react'
import 'styles/ui/Select.scss';

export default function Select(props) {
    const { items } = props;
    return (
        <div className="select">
            <select id="standard-select">
                {items.map((item) => {
                    return <option key={item.value} value={item.value}>{item.name}</option>
                })}
            </select>
            <span className="focus"></span>
        </div>
    )
}
