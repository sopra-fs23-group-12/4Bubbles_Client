import React, { useState } from 'react';
import '../../styles/ui/bottom-banner.scss';

export default function BottomBanner(props) {
    const [showMessage, setShowMessage] = useState(false);

    return (
        <div className="bottom-banner">
            <div className="botttom-banner__container">
                <div>For the best user experience add this web-app to your homescreen. You don't know how to do it? Click <a onClick={() => setShowMessage(true)}>here</a> for further info!</div>
                <div className={showMessage ? "bottom-banner__hidden active" : "bottom-banner__hidden"}><h3>iOS</h3>
                <p>1. click on the share-icon in Safari</p>
                <p>2. click on "Add to Home Screen"</p>
                <p>3. go to Home Screen and open 4Bubbles-App</p>
             <h3>Android</h3>
                <p>1. click on the share-icon in Safari</p>
                <p>2. click on "Add to Home Screen"</p>
                <p>3. go to Home Screen and open 4Bubbles-App</p>
                <div>
                Click <a onClick={() => setShowMessage(false)}>here</a> to close this message!

                </div>
                </div>
            </div>
        </div>)};