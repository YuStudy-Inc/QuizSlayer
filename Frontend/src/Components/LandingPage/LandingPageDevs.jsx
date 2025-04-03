import { useState } from "react"
import "../Styles/Components/LandingPageDevs.css"
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
                                <Developer imageOfThem={duckCharacter} name={"Nick Amancio"} description={"hello huzz"} LinkedIn={"https://www.linkedin.com/in/nicholas-amancio/"} GitHub={"https://github.com/Nickthecan"}/>
                                <Developer imageOfThem={capyBaraCharacter} name={"Joshua Ho"} description={"hello bruzz"} LinkedIn={"https://www.linkedin.com/in/joshua-h-ho/"} GitHub={"https://github.com/jhhocs"}/>
                                <Developer imageOfThem={frogCharacter} name={"Thomas Tejedor"} description={"nah🥀she's🥀got🥀u🥀blushing🥀twin🥀ah🥀hell🥀nah🥀twin🥀u🥀gotta🥀lock🥀up🥀twin🥀bruh🥀this🥀not🥀even🥀u🥀twin🥀on🥀fonem🥀grave🥀bru🥀𝓮𝓾𝓪𝓪𝓱𝓱.😇"} LinkedIn={"https://www.linkedin.com/in/thomas-tejedor-576b952a7/"} GitHub={"https://github.com/ThomasTejedor"}/>
                                <Developer imageOfThem={raccoonCharacter} name={"Alvan Zhuang"} description={"hello huzz"} LinkedIn={"https://www.linkedin.com/in/alvanzhuang/"} GitHub={"https://github.com/AlvanZ"}/>
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