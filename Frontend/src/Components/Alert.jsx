import "../Styles/Components/Alert.css"

const Alert = ({text, buttonOneText, functionButtonOne, buttonTwoText, functionButtonTwo }) => {
    return(
        <>
            <div className="dim-background">
                <div className="alert-container">
                    <h1>{text}dasd</h1>
                    <div className={`${buttonTwoText ? "two-buttons" : "buttons"}`}>
                        <button onClick={functionButtonOne}>{buttonOneText}</button>
                        {buttonTwoText && <button onClick={functionButtonTwo}>{buttonTwoText}</button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Alert