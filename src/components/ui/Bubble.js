import "styles/ui/Bubble.scss";



export const Bubble = props => (
    <div
        {...props}
        style={{ width: props.width, ...props.style }}
        className={`bubble-button ${props.className}`}>
        <div className="bubble-button__inner">
            <img src={'/static/media/bubble.svg'} alt="bubble" />
            <img className="bubble-button__splash" alt="splash" src="/static/media/bubble-splash.svg" />


            <div className="bubble-button__content">
                {props.children}

            </div>
        </div>
    </div>
);

