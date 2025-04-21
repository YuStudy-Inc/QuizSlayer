import "../Styles/Components/Podium.css"
import { podium, duckCharacter, bucketHat, playfulCloud, ironSword, redBalloon, someonesGun, fryingPan } from "../assets/Pictures"

const Podium = ({ character, hat, weapon }) => {
    return(
        /* I guess Ill be drawing the Podium, it will look cooler */
        /* place holder for now */
        <>
            <div className="the-podium">
                <img className="weapon-on-podium" src={weapon} alt="" />
                <img className="hat-on-podium" src={hat} alt="" />
                <img className="character-on-podium" src={character} alt="" />
                <img className="podium" src={podium} alt="" />
            </div>
        </>
    )
}

export default Podium

