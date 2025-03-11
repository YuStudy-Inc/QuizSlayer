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
                        <SpecialThanksCards image={crowCharacter} name={"Auralyie"} role={"Background Design"} linkForSocial={"https://www.instagram.com/auralyie/"}/>
                        <SpecialThanksCards image={armoredSolder} name={"Daniel"} role={"Interviewee"} linkForSocial={"https://www.linkedin.com/in/danielpasion/"}/>
                        <SpecialThanksCards image={podium} name={"Justin"} role={"Interviewee"} linkForSocial={"https://www.linkedin.com/in/justin-mn/"}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPageSpecialThanks