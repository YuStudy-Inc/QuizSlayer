import { useState } from "react"
import "../Styles/Components/LandingPageDevs.css"
import { duckCharacter, capyBaraCharacter, frogCharacter, raccoonCharacter } from "../assets/Pictures"
import Developer from "./Developer"


const LandingPageDevs = () => {
    const [whoActive, setWhoActive] = useState(0)
    const [direction, setDirection] = useState(null)

    const handleClickLeft = () => {
        setDirection("right")
        if (whoActive === 0)
            setWhoActive(3)
        else
            setWhoActive(whoActive - 1)
    } 

    const handleClickRight = () => {
        setDirection("left")
        if (whoActive === 3)
            setWhoActive(0)
        else
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
                    <div className="carousel">
                        <button onClick={handleClickLeft}><h1>&lt;</h1></button>
                        {/* I need a sliding animation but idk how to do that. I need it to slide to the left when clicked left and vice versa */}
                        <div className="developer-box">
                            <Developer imageOfThem={duckCharacter} name={"Nick Amancio"} description={"hello huzz"} LinkedIn={"https://www.linkedin.com/in/nicholas-amancio/"} GitHub={"https://github.com/Nickthecan"} active={whoActive === 0}/>
                            <Developer imageOfThem={capyBaraCharacter} name={"Joshua Ho"} description={"hello bruzz"} LinkedIn={"https://www.linkedin.com/in/joshua-h-ho/"} GitHub={"https://github.com/jhhocs"} active={whoActive === 1}/>
                            <Developer imageOfThem={frogCharacter} name={"Thomas Tejedor"} description={"nah🥀she's🥀got🥀u🥀blushing🥀twin🥀ah🥀hell🥀nah🥀twin🥀u🥀gotta🥀lock🥀up🥀twin🥀bruh🥀this🥀not🥀even🥀u🥀twin🥀on🥀fonem🥀grave🥀bru🥀𝓮𝓾𝓪𝓪𝓱𝓱.😇"} LinkedIn={"https://www.linkedin.com/in/thomas-tejedor-576b952a7/"} GitHub={"https://github.com/ThomasTejedor"} active={whoActive === 2}/>
                            <Developer imageOfThem={raccoonCharacter} name={"Alvan Zhuang"} description={"hello huzz"} LinkedIn={"https://www.linkedin.com/in/alvanzhuang/"} GitHub={"https://github.com/AlvanZ"} active={whoActive === 3}/>
                        </div>
                        <button onClick={handleClickRight}><h1>&gt;</h1></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPageDevs