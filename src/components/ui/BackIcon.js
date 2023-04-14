import React from 'react'
import { useHistory } from 'react-router-dom'
import 'styles/ui/BackIcon.scss';

export default function BackIcon() {
    const navigate = useHistory();
    return (
        <div className="back-icon" onClick={() => navigate.goBack()}><img src="./media/undo-circle.png" alt="back-icon" /></div>

    )
}
