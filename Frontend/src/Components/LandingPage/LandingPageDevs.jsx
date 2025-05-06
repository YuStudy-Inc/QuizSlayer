import { useState } from "react"
import "../../Styles/Components/LandingPage/LandingPageDevs.css"
import { duckCharacter, capyBaraCharacter, frogCharacter, raccoonCharacter } from "../../assets/Pictures"
import Developer from "./Developer"


const LandingPageDevs = () => {
    const [whoActive, setWhoActive] = useState(0)
    const [disabled, setDisabled] = useState("left")

    const handleClickLeft = () => {
        if (whoActive === 0)
            return;
        else if (whoActive === 1)
            setDisabled("left")
        else
            setDisabled("");
        setWhoActive(whoActive - 1)
        
    } 

    const handleClickRight = () => {
        if (whoActive === 3)
            return;
        else if (whoActive == 2)
            setDisabled("right")
        else
            setDisabled("");
        setWhoActive(whoActive + 1)
    } 

    return (
        <>
            <div className="meet-the-devs-container">
                <div className="devs">
                    <div className="title-devs">
                        <h1> Meet The Developers</h1>
                        <div className="underline"></div>
                    </div>
                    <div className="landing-page-carousel-container">
                        <button onClick={handleClickLeft} className={disabled === "left" ? "disable" : ""}><h1>&lt;</h1></button>
                        <div className="carousel">
                            <div className="developer-box" style={{ '--developer': whoActive}}>
                                <Developer imageOfThem={duckCharacter} name={"Nicholas Amancio"} description={"CEO Lead\nUI Design\nCharacter Design and Art\nFrontend\nBackend\nDevOps"} LinkedIn={"https://www.linkedin.com/in/nicholas-amancio/"} GitHub={"https://github.com/Nickthecan"}/>
                                <Developer imageOfThem={capyBaraCharacter} name={"Joshua Ho"} description={"Frontend\nBackend"} LinkedIn={"https://www.linkedin.com/in/joshua-h-ho/"} GitHub={"https://github.com/jhhocs"}/>
                                <Developer imageOfThem={frogCharacter} name={"Thomas Tejedor"} description={"AI Developer\nFrontend\nBackend\nDevOps"} LinkedIn={"https://www.linkedin.com/in/thomas-tejedor-576b952a7/"} GitHub={"https://github.com/ThomasTejedor"}/>
                                <Developer imageOfThem={raccoonCharacter} name={"Alvan Zhuang"} description={"Game Developer\nFrontend\nBackend"} LinkedIn={"https://www.linkedin.com/in/alvanzhuang/"} GitHub={"https://github.com/AlvanZ"}/>
                            </div>
                        </div>
                        <button onClick={handleClickRight} className={disabled === "right" ? "disable" : ""}><h1>&gt;</h1></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPageDevs