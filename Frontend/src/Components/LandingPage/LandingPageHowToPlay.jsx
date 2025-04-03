import "../Styles/Components/LandingPageHowToPlay.css"
import { chiikawaBackground } from "../../assets/Pictures.js"

const HowtoPlayTitle = () => {
    return (
        <>
            <div className="how-to-play-title-container">
                <div className="how-to-actually">
                    <div className="words-how-to">
                        <h1 className="title-how-to">How to Play</h1>
                        <p>In order to play this game</p>
                    </div>
                    <img src={chiikawaBackground} alt="" />
                </div>
            </div>
        </>
    )
}

export default HowtoPlayTitle