import "../../Styles/Pages/MainMenu/Gacha.css"
import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Alert from "../../Components/Alert"
import UserData from "../../UserData.js"
import {
    chestClosed, chestOpened, playfulCloud, someonesGun, redBalloon, 
    fryingPan, ironSword, nightCap, wizardHat, pot, bananaPeel, diamondHelmet,
    bucketHat, crowCharacter, frogCharacter, capyBaraCharacter, raccoonCharacter, 
    coins, oneStar, twoStar, threeStar, fourStar 
} from "../../assets/Pictures"
import HatsEnum from "../../assets/Hats/HatsEnum.js"
import WeaponsEnum from "../../assets/Weapons/WeaponsEnum.js"
import CharacterEnum from "../../assets/Characters/CharacterEnum.js"

const URI = import.meta.env.VITE_APP_URI
const userId = JSON.parse(localStorage.getItem('id'));

const Gacha = () => {  
    const oneStarItems = [
        coins
    ]
    const twoStarItems = [
        redBalloon, fryingPan, ironSword, nightCap, pot, diamondHelmet, bucketHat
    ]
    const threeStarItems = [
        someonesGun, playfulCloud, wizardHat, bananaPeel
    ]
    const fourStarItems = [
        crowCharacter, frogCharacter, capyBaraCharacter, raccoonCharacter
    ]

    const oneStarItemNames = [
        "50 coins"
    ]
    const twoStarItemNames = [
        "Red Balloon", "Frying Pan", "Iron Sword", "Night Cap", "Pot", "Diamond Helmet", "Bucket Hat"
    ]
    const threeStarItemNames = [
        "Someone's Gun", "Playful Cloud", "Wizard Hat", "Banana Peel"
    ]
    const fourStarItemNames = [
        "Crow", "Frog", "Capybara", "Raccoon"
    ]

    const proababilityGeneratorPleaseDontLookAtThisReallyInefficientCode = [
        2, 1, 1, 2, 2, 1, 1, 3, 2, 1,
        1, 1, 2, 1, 1, 1, 3, 2, 1, 2,
        4, 3, 2, 2, 1, 2, 3, 1, 1, 1,
        1, 2, 1, 1, 1, 3, 1, 1, 4, 2,
        2, 1, 1, 1, 1, 4, 2, 1, 2, 2,
        1, 3, 2, 1, 1, 1, 4, 3, 1, 1,
        3, 1, 3, 4, 3, 3, 1, 2, 1, 1,
        1, 2, 1, 4, 4, 4, 1, 1, 3, 2,
        2, 3, 4, 4, 1, 1, 2, 1, 1, 1,
        3, 1, 2, 3, 1, 2, 1, 1, 1, 2
      ]
    

    const [usersCoins, setUsersCoins] = useState(0)
    const [usersCharacterList, setUsersCharacterList] = useState([])
    const [usersInventory, setUsersInventory] = useState([])
    const [gachaAnimation, setGachaAnimation] = useState(false)
    const [alertForInsufficientFunds, setAlertForInsufficientFunds] = useState(false)
    const [isChestOpen, setIsChestOpen] = useState(false)
    const [stars, setStars] = useState(null)
    const [itemWon, setItemWon] = useState(null)
    const [itemName, setItemName] = useState(null)
    const [theResultsPageOfTheGacha, setTheResultsPageOfTheGacha] = useState(false)
    const [coinsTextIfTheyAlreadyWonThatItem, setCoinsTextIfTheyAlreadyWonThatItem] = useState(null)
    const [isRolling, setIsRolling] = useState(false)

    const navigate = useNavigate()

    let coinsIfTheyAlreadyWonThatItem

    useEffect(() => {
        const fetchUsersCoins = async () => {
            try {
                const response = await axios.get(`${URI}users/getUsersCoins/${userId}`, {
                    withCredentials: true
                })
                if (response.status === 200)
                    setUsersCoins(response.data.coins)
            }
            catch (e) {
                console.error("error retreiving user's coins")
            }
        }
        fetchUsersCoins()
    }, [URI, userId])

    const handleRoll = async () => {
        if (isRolling) return

        setIsRolling(true)

        setTheResultsPageOfTheGacha(false)
        setCoinsTextIfTheyAlreadyWonThatItem(null)

        if (usersCoins < 100) {
            setAlertForInsufficientFunds(true)
            return
        }
        else {
            try {
                const response = await axios.put(`${URI}users/updateCoins/${userId}`, {
                    coins: -100
                }, {
                    withCredentials: true
                })
                if (response.status === 200)
                    console.log("purchase loot box successful")
                
                const { randomItem, nameOfTheRandomItem, whichStar } = theGamblingAlgorithm()
                setItemWon(randomItem)
                setItemName(nameOfTheRandomItem)
                setStars(whichStar)

                //one star = 50, two stars = 75, three = 100 four == 300
                try {
                    const characterData = await axios.get(`${URI}users/getCharacterList/${userId}`, {
                        withCredentials: true
                    })
                    const inventoryData = await axios.get(`${URI}users/getInventory/${userId}`, {
                        withCredentials: true
                    })
                    setUsersCharacterList(characterData.data.characterList)
                    setUsersInventory(inventoryData.data.inventory)
                }
                catch (e) {
                    console.error("failed to fetch the player's inventory")
                }
                
                if (usersCharacterList.includes(randomItem) || usersInventory.includes(randomItem)) {
                    switch (whichStar) {
                        case (oneStar):
                            coinsIfTheyAlreadyWonThatItem = 50
                            setCoinsTextIfTheyAlreadyWonThatItem("50 Coins")
                            break
                        case (twoStar):
                            coinsIfTheyAlreadyWonThatItem = 75
                            setCoinsTextIfTheyAlreadyWonThatItem("75 Coins")
                            break
                        case (threeStar):
                            coinsIfTheyAlreadyWonThatItem = 100
                            setCoinsTextIfTheyAlreadyWonThatItem("100 Coins")
                            break
                        case (fourStar):
                            coinsIfTheyAlreadyWonThatItem = 300
                            setCoinsTextIfTheyAlreadyWonThatItem("300 Coins")
                            break
                        default:
                            setCoinsTextIfTheyAlreadyWonThatItem(null)
                    }
                }

                if (coinsTextIfTheyAlreadyWonThatItem === null && whichStar === fourStar) {
                    const characterEnumKey = lookUpItemFromTheEnums(CharacterEnum, randomItem)
                    if (characterEnumKey !== undefined) {
                        try {
                            const response = await axios.put(`${URI}users/addCharacter/${userId}`, {
                                character: characterEnumKey
                            }, {
                                withCredentials: true
                            })
                            if (response.status === 200)
                                console.log("added new character to User's collection")
                        }
                        catch (e) {
                            console.error("error adding new character to User's collection", e)
                        }
                    }
                }
                else if (coinsTextIfTheyAlreadyWonThatItem === null && (whichStar === threeStar || whichStar === twoStar)) {
                    let itemEnumKey = lookUpItemFromTheEnums(HatsEnum, randomItem) ?? lookUpItemFromTheEnums(WeaponsEnum, randomItem);
                    if (itemEnumKey !== undefined) {
                        try {
                            const response = await axios.put(`${URI}users/addItem/${userId}`, {
                                item: itemEnumKey
                            }, {
                                withCredentials: true
                            })
                            if (response.status === 200)
                                console.log("added new item to User's collection")
                        }
                        catch (e) {
                            console.error("error adding new item to User's collection", e)
                        }
                    }
                }
                else if (whichStar === oneStar) {
                    try {
                        const response = await axios.put(`${URI}users/updateCoins/${userId}`, {
                            coins: 50
                        }, {
                            withCredentials: true
                        })
                        if (response.status === 200)
                            console.log("updated user's balance")
                    }
                    catch (e) {
                        console.error("error updating user's balance", e)
                    }
                }
                else {
                    try {
                        const response = await axios.put(`${URI}users/updateCoins/${userId}`, {
                            coins: 50
                        }, {
                            withCredentials: true
                        })
                        if (response.status === 200)
                            console.log("updated user's balance")
                    }
                    catch (e) {
                        console.error("error updating user's balance", e)
                    }
                }

                setGachaAnimation(true)
                setTimeout(() => {
                    setIsChestOpen(true)
                }, 4500)
                setTimeout(() => {
                    setTheResultsPageOfTheGacha(true)
                    setGachaAnimation(false)
                    setIsChestOpen(false)
                }, 5000)
            }
            catch (e) {
                console.error("error buying lootbox", e)
            }
            finally {
                setTimeout(() => setIsRolling(false), 2000)
            }
        }
    }

    const theGamblingAlgorithm = () => {
        const random = proababilityGeneratorPleaseDontLookAtThisReallyInefficientCode[Math.floor(Math.random() * proababilityGeneratorPleaseDontLookAtThisReallyInefficientCode.length)]
        let place
        let randomItem
        let nameOfTheRandomItem
        let whichStar
        switch (random) {
            case (1):
                whichStar = oneStar
                place = Math.floor(Math.random() * oneStarItems.length)
                randomItem = oneStarItems[place]
                nameOfTheRandomItem = oneStarItemNames[place]
                break
            case (2):
                whichStar = twoStar
                place = Math.floor(Math.random() * twoStarItems.length)
                randomItem = twoStarItems[place]
                nameOfTheRandomItem = twoStarItemNames[place]
                break
            case (3):
                whichStar = threeStar
                place = Math.floor(Math.random() * threeStarItems.length)
                randomItem = threeStarItems[place]
                nameOfTheRandomItem = threeStarItemNames[place]
                break
            case (4):
                whichStar = fourStar
                place = Math.floor(Math.random() * fourStarItems.length)
                randomItem = fourStarItems[place]
                nameOfTheRandomItem = fourStarItemNames[place]
                break
            default:
                whichStar = oneStar
                place = Math.floor(Math.random() * oneStarItems.length)
                randomItem = oneStarItems[place]
                nameOfTheRandomItem = oneStarItemNames[place]
        }
        return { randomItem, nameOfTheRandomItem, whichStar }
    }

    const lookUpItemFromTheEnums = (enumObject, value) => {
        return Object.keys(enumObject).find(key => enumObject[key] === value)
    }

    return(
        <>
            <div className="gacha-container">
                {!gachaAnimation ? (<div className="back">
                    <button className="back-button" onClick={() => navigate('/collection')}>
                        <h1>&lt;</h1>
                    </button>
                </div>) : null }
                {alertForInsufficientFunds && (<Alert text={"Insufficient Funds!"} buttonOneText={"Ok"} functionButtonOne={() => {setAlertForInsufficientFunds(false)}} show={true}/>)}
                <div className="stuff-in-gacha">
                    {theResultsPageOfTheGacha ? (
                        <>
                            <div className="rarity">
                                <img src={stars} alt="" />
                            </div>
                            <div className="picture-of-the-thing-you-won">
                                <img src={itemWon} alt="" />
                            </div>
                            <div className="name-of-the-thing-you-won">
                                <h1>{itemName} {coinsTextIfTheyAlreadyWonThatItem !== null ? `:${coinsTextIfTheyAlreadyWonThatItem}` : ""}</h1>
                            </div>
                            <div className="button-for-gacha">
                                <button onClick={handleRoll} disabled={isRolling}>Buy Again? : 100 coins</button>
                            </div>
                        </>
                    ) : (
                        <>
                            {gachaAnimation ? (
                                <div className="chest chest-opening">
                                    {isChestOpen ? (
                                        <img src={chestOpened} alt="" />
                                    ) : (
                                        <img src={chestClosed} alt="" />
                                    )}
                                </div>
                            ) : (
                                <>
                                    <div className="chest">
                                        <img src={chestClosed} alt="" />
                                    </div>
                                    <div className="coins">
                                        <h1>Your coins: {usersCoins}</h1>
                                    </div>
                                    <div className="button-for-gacha">
                                        <button onClick={handleRoll} disabled={isRolling}>Buy: 100 coins</button>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Gacha