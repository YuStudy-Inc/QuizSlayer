import "../Styles/Pages/LandingPage.css"
//why this no work ???
/* import { LandingPageTitle, LandingPageHowToPlay } from "../Components/Components.js" */
import LandingPageTitle from "../Components/LandingPageTitle"
import LandingPageHowToPlay from "../Components/LandingPageHowToPlay"
import LandingPageAboutUs from "../Components/LandingPageAboutUs.jsx"
import LandingPageDevs from "../Components/LandingPageDevs.jsx"
import LandingPageSpecialThanks from "../Components/LandingPageSpecialThanks.jsx"
import Footer from "../Components/Footer.jsx"
import { logo } from "../assets/Pictures.js"
import { useEffect, useState } from "react"

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
            <div className="landing-page-container"></div>
            <img className={`corner-logo ${showingTheLogo ? "visible" : ""}`} src={logo} alt="small-logo" />
            <LandingPageTitle />
            <LandingPageHowToPlay />
            <LandingPageAboutUs />
            <LandingPageDevs />
            <LandingPageSpecialThanks />
            <Footer />
        </>
    )
}

export default LandingPage