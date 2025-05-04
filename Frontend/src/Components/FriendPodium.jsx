import "../Styles/Components/Podium.css"
import UserData from "../UserData"
import CharacterEnum from "../assets/Characters/CharacterEnum"
import HatsEnum from "../assets/Hats/HatsEnum"
import WeaponsEnum from "../assets/Weapons/WeaponsEnum"
import { podium } from "../assets/Pictures"
import { useState, useEffect } from "react"

const FriendPodium = ({character, hat, weapon}) => {

    const [selectedCharacter, setSelectedCharacter] = useState(character || 0);
    const [selectedHat, setSelectedHat] = useState(hat || 0);
    const [selectedWeapon, setSelectedWeapon] = useState(weapon || 0);

    const updatePodium = (character, hat, weapon) => {
        setSelectedCharacter(character);
        setSelectedHat(hat);
        setSelectedWeapon(weapon);
    }

    useEffect(() => {
        // UserData.updateUserData();
        updatePodium();
    })

    return(
        /* I guess Ill be drawing the Podium, it will look cooler */
        /* place holder for now */
        <>
            <div className="the-podium">
                <img className="weapon-on-podium" src={selectedWeapon} alt="" />
                <img className="hat-on-podium" src={selectedHat} alt="" />
                <img className="character-on-podium" src={selectedCharacter} alt="" />
                <img className="podium" src={podium} alt="" />
            </div>
        </>
    )
}

export default FriendPodium

