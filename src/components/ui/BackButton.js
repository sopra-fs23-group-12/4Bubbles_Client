import 'styles/ui/BackButton.scss';

export const BackButton = props => (
    <div
        {...props}
        style={{ width: props.width, ...props.style }}
        className={`backButton ${props.className}`}>
        <div className="backButton">
            <img src="../assets/back.svg" />
        </div>
    </div>
);
            