import React, { useState } from 'react'
import 'styles/ui/Select.scss';

export default function Select(props) {
    const { items, value, onChange } = props;
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
        console.log(isOpen);
    }

    const select = (item) => {
        console.log(item);
        setIsOpen(!isOpen);
        document.getElementById('test').value = item;
        onChange(item);
    }



    return (
        <div className="custom-select">
            <select id="test" onChange={onChange} value={value}>
                {items.map((item) => {
                    return <option key={item.value} value={item.value}>{item.name}</option>;
                })}
            </select>
            <div onClick={toggle} className={isOpen ? "select-selected select-arrow-active is-open" : "select-selected"} > {value === undefined ? "Choose a question topic" : value}<span className="arrow-wrapper"><img src="/static/media/arrow.png" alt="arrow" /></span></div>
            <div className={isOpen ? " select-items" : "select-items select-hide"}>
                {items.map((item) => {
                    return <div className={item.value === value ? "is-active" : null} key={item.value} onClick={() => select(item.value)}>{item.name}</div>;
                })}
            </div>
        </div>
    )
}
