import "../Styles/Components/LandingPageTitle.css"
import { logo } from "../assets/Pictures.js"

const LandingPageTitle = () => {
    return (
        <>
            <div className="background-for-title-page">
                <div className="black-triangle-thingy">
                    {/* the logo looks ass rn, imma fix it but that's the rough sketch */}
                    <img className="logo-big" src={logo} alt="logo-for-title" />
                    <div className="button-container-title">
                        <button className="login-button">Login</button>
                        <button className="signup-button">Sign Up</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPageTitle