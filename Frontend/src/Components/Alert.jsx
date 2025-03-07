import "../Styles/Components/Alert.css"

const Alert = ({text, buttonOneText, functionButtonOne, buttonTwoText, functionButtonTwo }) => {
    return(
        <>
            <div className="dim-background">
                <div className="alert-container">
                    <h1>{text}Ready to Begin?</h1>
                    <div className={`button-container ${buttonTwoText ? "two-buttons" : "two-buttons"}`}>
                        <button className={`${buttonTwoText ? "bad-button" : "bad-button"}`} onClick={functionButtonOne}>{buttonOneText}No</button>
                        {<button onClick={functionButtonTwo}>{buttonTwoText}Yes</button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Alert