import { useState, useEffect } from "react"
import "../Styles/Components/LandingPageTitle.css"
import { logo, backgroundFight } from "../assets/Pictures.js"


const LandingPageTitle = () => {
    const [maxTranslate, setMaxTranslate] = useState(0)

    useEffect(() => {
        const img = document.getElementById("bg-image")
        const triangleThingy = document.getElementById("triangle")
        if (img && triangleThingy) {
            const viewportWidth = window.innerWidth
            const imageWidth = img.width
            const triangleRightEdge = triangleThingy.offsetLeft + triangleThingy.offsetWidth
            
            const maxTranslateValue = imageWidth - triangleRightEdge
            setMaxTranslate(maxTranslateValue)
            //bruh i think that worked
            document.documentElement.style.setProperty("--max-translate", `${maxTranslate}px`)
        }
    }, [])
    
    return (
        <>
            <div className="background-for-title-page">
                <img id="bg-image" className="moving-background" src={backgroundFight} alt="" />
                <div id="triangle" className="black-triangle-thingy">
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