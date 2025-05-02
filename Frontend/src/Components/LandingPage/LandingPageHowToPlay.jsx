import "../../Styles/Components/LandingPage/LandingPageHowToPlay.css"
import { battle } from "../../assets/Pictures.js"

const HowtoPlayTitle = () => {
    return (
        <>
            <div className="how-to-play-title-container">
                <div className="how-to-actually">
                    <div className="words-how-to">
                        <h1 className="title-how-to">How to Play</h1>
                        <p>During each game, you are given a question from your crafted quiz. Choose the right answer in the right amount of time. 
                            The more questions you answer correct, the more damage you deal to your enemies. Be careful, wrong answers can end up hurting you. 
                            At the end of each battle, you can earn experience and coins which can then be traded for cool characters, items, or weapons.</p>
                    </div>
                    <img src={battle} alt="" />
                </div>
            </div>
        </>
    )
}

export default HowtoPlayTitle