import "../Styles/Components/LandingPageDevs.css"
import { duckCharacter, capyBaraCharacter, frogCharacter, raccoonCharacter } from "../assets/Pictures"
import Developer from "./Developer"


const LandingPageDevs = () => {
    return (
        <>
            <div className="meet-the-devs-container">
                <div className="devs">
                    <h1 className="title-devs"> Meet The Developers</h1>
                    <div className="underline"></div>
                    <div className="carousel">
                        <button><h1>&lt;</h1></button>
                        <Developer imageOfThem={duckCharacter} name={"Nick"} description={"hello huzz"}/>
                        <button><h1>&gt;</h1></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPageDevs