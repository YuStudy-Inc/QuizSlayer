import "../Styles/Pages/LandingPage.css"
//why this no work ???
import { LandingPageTitle, LandingPageHowToPlay, LandingPageAboutUs, LandingPageDevs, LandingPageSpecialThanks, Footer } from "../Components/Components.js"
import { logo } from "../assets/Pictures.js"
import { useEffect, useState } from "react"
import LoadingScreen from "./LoadingScreen.jsx"

const LandingPage = () => {
    const [showingTheLogo, setShowingTheLogo] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= window.innerHeight) {
                setShowingTheLogo(true)
            }
            else {
                setShowingTheLogo(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])    
    
    
    return (
        <>
            <div className="landing-page-container">
                <img className={`corner-logo ${showingTheLogo ? "visible" : ""}`} src={logo} alt="small-logo" />
                <LandingPageTitle />
                <LandingPageHowToPlay />
                <LandingPageAboutUs />
                <LandingPageDevs />
                <LandingPageSpecialThanks />
                {/* <Footer /> */}
            </div>
        </>
    )
}

export default LandingPage