import "../Styles/Components/LandingPageAboutUs.css"
import { chiikawaBackground } from "../../assets/Pictures.js"

const LandingPageAboutUs = () => {
    return (
        <>
            <div className="about-us-container">
                <div className="about-us">
                    <div className="about-us-pictures">
                        <img src={chiikawaBackground} alt="" />
                        <img src={chiikawaBackground} alt="" />
                        <img src={chiikawaBackground} alt="" />
                    </div>
                    <div className="about-us-words">
                        <h1 className="about-us-title">About Us</h1>
                        <p>We are YuStudy Inc.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPageAboutUs