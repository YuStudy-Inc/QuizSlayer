import "../Styles/Components/Podium.css"
import UserData from "../UserData"
import CharacterEnum from "../assets/Characters/CharacterEnum"
import HatsEnum from "../assets/Hats/HatsEnum"
import WeaponsEnum from "../assets/Weapons/WeaponsEnum"
import { podium } from "../assets/Pictures"
import { useState, useEffect } from "react"

const Podium = ({character, hat, weapon}) => {

    // Set podium to User's selected character/items first
    const [selectedCharacter, setSelectedCharacter] = useState(UserData.getSelectedCharacter());
    const [selectedHat, setSelectedHat] = useState(UserData.getSelectedHat());
    const [selectedWeapon, setSelectedWeapon] = useState(UserData.getSelectedWeapon());

    const updatePodium = () => {
        setSelectedCharacter(character ? character : UserData.getSelectedCharacter());
        setSelectedHat(hat ? hat : UserData.getSelectedHat());
        setSelectedWeapon(weapon ? weapon : UserData.getSelectedWeapon());
    }

    useEffect(() => {
        if (!character && !hat && !weapon) {
            console.log("change to podium")
            updatePodium();
        }
    }, [character, hat, weapon]);

    return(
        /* I guess Ill be drawing the Podium, it will look cooler */
        /* place holder for now */
        <>
            <div className="the-podium">
                <img className="weapon-on-podium" src={WeaponsEnum[weapon ?? selectedWeapon]} alt="" />
                <img className="hat-on-podium" src={HatsEnum[hat ?? selectedHat]} alt="" />
                <img className="character-on-podium" src={CharacterEnum[character ?? selectedCharacter]} alt="" />
                <img className="podium" src={podium} alt="" />
            </div>
        </>
    )
}

export default Podium

