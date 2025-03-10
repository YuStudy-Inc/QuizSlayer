import "../Styles/Pages/LoadingScreen.css"
import { useEffect } from "react";

const LoadingScreen = ({ isLoaded }) => {

    /* no more scrolling when the loading screen is appearing */
    useEffect(() => {
        if (!isLoaded) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto"; 
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isLoaded]);

    return (
        <>
            <div className={`loading-screen-container ${isLoaded ? "loaded" : ""}`}>
                <div className="load">
                    <div className="title-for-load">
                        <h1>L</h1>
                        <h1>O</h1>
                        <h1>A</h1>
                        <h1>D</h1>
                        <h1>I</h1>
                        <h1>N</h1>    
                        <h1>G</h1>
                        <h1>.</h1>
                        <h1>.</h1>
                        <h1>.</h1>
                    </div>
                    <div className="message-for-load">
                        <p>Strike First. Strike Hard. No Mercy</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoadingScreen