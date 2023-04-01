import React from 'react'
import 'styles/ui/SettingsContainer.scss';

export default function SettingsContainer(props) {
    const { title, children } = props;
    return (
        <div className="settings-container">
            {title !== null ? <h2>{title}</h2> : null}{children}</div>
    )
}
