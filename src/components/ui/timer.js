import React, { useState, useEffect, useRef } from 'react'
import 'styles/ui/Select.scss';

export default function Timer(props) {

    const { initialTime, onEnd} = props;

    const [counter, setCounter] = useState(initialTime);
    const timer = useRef(null);

    useEffect(() => {
        timer.current = setInterval(() => setCounter((v) => v - 1), 1000);
    
        if (counter === 0) {
            clearInterval(timer.current);
            onEnd();
        }
        return () => {
          clearInterval(timer.current);
        };
      }, [counter]);

    return (
        <div>
            &nbsp;{counter}s
        </div>
    )
}
