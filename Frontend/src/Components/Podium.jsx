import "../Styles/Components/Podium.css"
import UserData from "../UserData"
import CharacterEnum from "../assets/Characters/CharacterEnum"
import HatsEnum from "../assets/Hats/HatsEnum"
import { bucketHat } from "../assets/Pictures"
import WeaponsEnum from "../assets/Weapons/WeaponsEnum"
import { podium } from "../assets/Pictures"

UserData.updateUserData()

const Podium = () => {
    return(
        /* I guess Ill be drawing the Podium, it will look cooler */
        /* place holder for now */
        <>
        {/* {UserData.updateUserData()} */}
            <div className="the-podium">
                <img className="weapon-on-podium" src={WeaponsEnum[UserData.getSelectedWeapon()]} alt="" />
                <img className="hat-on-podium" src={HatsEnum[UserData.getSelectedHat()]} alt="" />
                <img className="character-on-podium" src={CharacterEnum[UserData.getSelectedCharacter()]} alt="" />
                <img className="podium" src={podium} alt="" />
            </div>
        </>
    )
}

export default Podium

