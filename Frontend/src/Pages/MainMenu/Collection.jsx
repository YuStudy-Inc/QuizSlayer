import { Podium } from "../../Components/Components.js"
import { lock, lootBox } from "../../assets/Pictures.js"
import CharacterEnum from "../../assets/Characters/CharacterEnum.js"
import "../../Styles/Pages/MainMenu/Collection.css"
import { useNavigate } from "react-router-dom"
import UserData from "../../UserData.js"
import { useState } from "react"
import HatsEnum from "../../assets/Hats/HatsEnum.js"
import WeaponsEnum from "../../assets/Weapons/WeaponsEnum.js"

import axios from "axios";

const URI = import.meta.env.VITE_APP_URI;

const Collection = () => {
    const navigate = useNavigate()

    const [selectedCharacter, setSelectedCharacter] = useState(UserData.getSelectedCharacter());
    const [selectedHat, setSelectedHat] = useState(UserData.getSelectedHat());
    const [selectedWeapon, setSelectedWeapon] = useState(UserData.getSelectedWeapon());

    const updateCharacter = (direction) => {
        const characters = Object.keys(CharacterEnum);
        const currentIndex = characters.indexOf(""+selectedCharacter);
        const newIndex = (currentIndex + (direction === 'left' ? -1 : 1) + characters.length) % characters.length;
        setSelectedCharacter(characters[newIndex]);
    };

    const updateHat = (direction) => {
        const hats = Object.keys(HatsEnum);
        const currentIndex = hats.indexOf(selectedHat);
        const newIndex = (currentIndex + (direction === 'left' ? -1 : 1) + hats.length) % hats.length;
        setSelectedHat(hats[newIndex]);
    };

    const updateWeapon = (direction) => {
        const weapons = Object.keys(WeaponsEnum);
        const currentIndex = weapons.indexOf(selectedWeapon);
        const newIndex = (currentIndex + (direction === 'left' ? -1 : 1) + weapons.length) % weapons.length;
        setSelectedWeapon(weapons[newIndex]);
    };

    const hasAll = () => {
        let hasCharacter = UserData.getCharacterList().includes(parseInt(selectedCharacter));
        let hasHat = selectedHat == "0" || UserData.getInventory().includes(parseInt(selectedHat));
        let hasWeapon = selectedWeapon == "0" || UserData.getInventory().includes(parseInt(selectedWeapon));

        return hasCharacter && hasHat && hasWeapon;
    }

    const save = () => {

        if(!hasAll()) {
            return;
        }

        axios({
            method: "post",
            url: URI + "users/updateSelections/",
            data: {
                selectedCharacter,
                selectedHat,
                selectedWeapon
            },
            withCredentials:true,
        })
    }

    return (
        <>
            <div className="collection-page">
                <div className="collection-page-outer-container">
                    <div className="collection-page-left-container test">
                        <div className="collection-title">
                            <h1>Collection</h1>
                        </div>
                        <div className="podium-centerer-collection">
                            {/* <Podium className="collection-podium"/> */}
                                <Podium 
                                    className="collection-podium" 
                                    character={selectedCharacter} 
                                    hat={selectedHat} 
                                    weapon={selectedWeapon} 
                                />
                        </div>
                    </div>
                    <div className="collection-page-right-container test">
                        <div className="carousels">
                            <h2 className="collection-page-select-category-header">character</h2>
                            <div className="collection-page-select-container">
                                <p className="collection-page-select-arrow" onClick={() => updateCharacter("left")}>	&#60; </p>
                                <img className="character-image" src={CharacterEnum[selectedCharacter]} alt="" />
                                <img className="lock" src={lock} hidden={UserData.getCharacterList().includes(parseInt(selectedCharacter)) ? true : false} alt="" />
                                <p className="collection-page-select-arrow right" onClick={() => updateCharacter("right")}> &#62; </p>
                            </div>
                        </div>
                        <div className="carousels">
                            <h2 className="collection-page-select-category-header">hat</h2>
                            <div className="collection-page-select-container">
                                <p className="collection-page-select-arrow" onClick={() => updateHat("left")}>	&#60; </p>
                                <img className="hat-image" src={HatsEnum[selectedHat]} alt="" />
                                <img className="lock" src={lock} hidden={selectedHat == "0" || UserData.getInventory().includes(parseInt(selectedHat)) ? true : false} alt="" />
                                <p className="collection-page-select-arrow right" onClick={() => updateHat("right")}> &#62; </p>
                            </div>
                        </div>
                        <div className="carousels">
                            <h2 className="collection-page-select-category-header">weapon</h2>
                            <div className="collection-page-select-container">
                                <p className="collection-page-select-arrow" onClick={() => updateWeapon("left")}>	&#60; </p>
                                <img className="weapon-image" src={WeaponsEnum[selectedWeapon]} alt="" />
                                <img className="lock" src={lock} hidden={selectedWeapon == "0" || UserData.getInventory().includes(parseInt(selectedWeapon)) ? true : false} alt="" />
                                <p className="collection-page-select-arrow right" onClick={() => updateWeapon("right")}> &#62; </p>
                            </div>
                        </div>
                        <button onClick={() => save()} disabled={!hasAll()}>Save</button>
                    </div>
                </div>
                <div className="gatcha">
                    <button className="gatcha-button" onClick={() => {navigate('/gatcha')}}>
                        <img src={lootBox} alt="" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Collection;