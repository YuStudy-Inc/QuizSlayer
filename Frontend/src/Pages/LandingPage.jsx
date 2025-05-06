import "../Styles/Pages/LandingPage.css"
import { LandingPageTitle, LandingPageHowToPlay, LandingPageAboutUs, LandingPageDevs, LandingPageSpecialThanks, Footer } from "../Components/Components.js"
import { logo, arrow } from "../assets/Pictures.js"
import { useEffect, useState, useRef } from "react"

const LandingPage = () => {
    const [showingTheLogo, setShowingTheLogo] = useState(false)
    const imageRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= window.innerHeight) {
                setShowingTheLogo(true);
            } else {
                setShowingTheLogo(false);
            }

            if (window.scrollY === 0 && imageRef.current) {
                imageRef.current.classList.remove('rotated');
            } else if (imageRef.current) {
                imageRef.current.classList.add('rotated');
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleArrowClick = () => {
        const isScrolledDownByATeensyBit = imageRef.current?.classList.toggle("rotated");
        if (isScrolledDownByATeensyBit) {
            window.scrollBy({
                top: 950,
                behavior: "smooth"
            });
        } else {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }; 
    
    return (
        <>
            <div className="landing-page-container">
                <img className={`corner-logo ${showingTheLogo ? "visible" : ""}`} src={logo} alt="small-logo" />
                <button className="arrow" onClick={handleArrowClick}>
                    <img ref={imageRef} src={arrow} alt="" />
                </button>
                <LandingPageTitle />
                <LandingPageHowToPlay />
                <LandingPageAboutUs />
                <LandingPageDevs />
                <LandingPageSpecialThanks />
                <Footer />
            </div>
        </>
    )
}

export default LandingPage