import "../Styles/Components/Podium.css"
import { podium } from "../assets/Pictures"

const Podium = ({ className = "" }) => {
    return(
        /* I guess Ill be drawing the Podium, it will look cooler */
        /* place holder for now */
        <img className={`the-podium ${className}`} src={podium} alt="" />
    )
}

export default Podium

