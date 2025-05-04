import "../Styles/Components/Alert.css"
import { useEffect } from "react"

const Alert = ({text, subtitle, buttonOneText, functionButtonOne, buttonTwoText, functionButtonTwo, show }) => {
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [show]);

    if (!show) return null;

    return(
        <>
            <div className="dim-background">
                <div className="alert-container">
                    <h1>{text}</h1>
                    {subtitle && <h2>{subtitle}</h2>}
                    <div className={`button-container ${buttonTwoText ? "two-buttons" : "buttons"}`}>
                        <button className={`${buttonTwoText ? "bad-button" : ""}`} onClick={functionButtonOne}>{buttonOneText}</button>
                        {buttonTwoText && <button onClick={functionButtonTwo}>{buttonTwoText}</button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Alert