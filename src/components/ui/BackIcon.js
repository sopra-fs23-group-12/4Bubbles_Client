import React from 'react'
import { useHistory } from 'react-router-dom'
import 'styles/ui/BackIcon.scss';

export default function BackIcon() {
    const navigate = useHistory();
    return (
        <div className="back-icon" onClick={() => navigate.push('/welcomepage')}><img src="/static/media/undo-circle.png" alt="back-icon" /></div>

    )
}
