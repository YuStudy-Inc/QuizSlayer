import "../../Styles/Components/LandingPage/LandingPageTitle.css"
import { useState, useEffect } from "react"
import { logo, backgroundFight } from "../../assets/Pictures.js"
import { LoadingScreen } from "../../Pages/Pages.js"
import { useNavigate } from "react-router-dom"
import Alert from "../Alert.jsx"

const LandingPageTitle = () => {
    //predeployment remove when done
    const [sorryAlert, setSorryAlert] = useState(false)



    const [isLoaded, setIsLoaded] = useState(false)
    const [isTransitioning, setIsTransitioning] = useState(false)

    const wipeLoadingScreenOff = () => {
        const timer = setTimeout(() => {
            setIsTransitioning(true)
            const transitionTimer = setTimeout(() => {
                setIsLoaded(true); 
                setIsTransitioning(false);
            }, 1000);

            return () => clearTimeout(transitionTimer);
        }, 2400);

        return () => clearTimeout(timer);
    }

    useEffect(() => {
        wipeLoadingScreenOff()
    }, [])

    const navigate = useNavigate();
    const routeLogin = (isLogin) => {
        navigate('login', {
            state: {isLogin}
        })
    }
    
    return (
        <>
            {(!isLoaded || isTransitioning) && <LoadingScreen isLoaded={isLoaded} />}
            <LoadingScreen isLoaded={false}/>
            {/* remove */}
            {sorryAlert && <Alert text={"Sorry, the game is not ready to play yet ... 5/6/25"} buttonOneText={"Ok"} functionButtonOne={() => {setSorryAlert(false)}} show={true}/>}
            <div className="background-for-title-page">
                <img id="bg-image" className="moving-background" src={backgroundFight} alt="" />
                <div className="container-for-the-things-on-the-page">
                    {/* the logo looks ass rn, imma fix it but that's the rough sketch */}
                    <img className="logo-big" src={logo} alt="logo-for-title" />
                    <div className="button-container-title">
                        <button className="login-button" onClick={() => routeLogin(true)}>Login</button>
                        <button className="signup-button" onClick={() => setSorryAlert(true)}>Sign Up</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPageTitle