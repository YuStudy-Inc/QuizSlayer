import { useState, useEffect, useRef } from "react"
import "../Styles/Components/LandingPageTitle.css"
import { logo, backgroundFight } from "../assets/Pictures.js"
import LoadingScreen from "../Pages/LoadingScreen.jsx"


const LandingPageTitle = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [maxTranslate, setMaxTranslate] = useState(0)
    /* const isInitialLoad = useRef(true)

    const handleImageLoad = () => {
        const img = document.getElementById("bg-image")
        const triangleThingy = document.getElementById("triangle")
        
        if (img && triangleThingy) {
            const imageWidth = img.width
            const triangleRightEdge = triangleThingy.offsetLeft + triangleThingy.offsetWidth
            
            const maxTranslateValue = imageWidth - triangleRightEdge
            setMaxTranslate(maxTranslateValue)
            document.documentElement.style.setProperty("--max-translate", `${maxTranslate}px`)
        }
    } */

    /* THIS IS SO FUCKING STUPID LIKE HOW CAN I JUST LIKE LET THIS LOAD FIRST */

    const wipeLoadingScreenOff = () => {
        const timer = setTimeout(() => {
            setIsLoaded(true); 
            document.documentElement.style.setProperty("--max-translate", `${maxTranslate}px`);
        }, 2000);

        return () => clearTimeout(timer);
    }

    useEffect(() => {
        return () => {
            wipeLoadingScreenOff()
        }
    }, [])

    
    return (
        <>
            {!isLoaded && <LoadingScreen />}
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