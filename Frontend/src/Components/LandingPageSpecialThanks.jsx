import "../Styles/Components/LandingPageSpecialThanks.css"
import SpecialThanksCards from "./SpecialThanksCards"
import { crowCharacter, armoredSolder, podium } from "../assets/Pictures"

const LandingPageSpecialThanks = () => {
    return (
        <>
            <div className="special-thanks-container">
                <div className="thank-you">
                    <div className="words-thanks">
                        <h1 className="special-thanks-title">Special Thanks To</h1>
                        <div className="underline-thanks"></div>
                    </div>
                    <div className="pictures-and-descriptions"> 
                        <SpecialThanksCards image={crowCharacter} name={"Hannah"} role={"Background Design"}/>
                        <SpecialThanksCards image={armoredSolder} name={"Daniel"} role={"Interviewee"}/>
                        <SpecialThanksCards image={podium} name={"Justin"} role={"Interviewee"}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPageSpecialThanks