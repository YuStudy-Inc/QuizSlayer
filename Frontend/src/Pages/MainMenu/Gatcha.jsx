import "../../Styles/Pages/MainMenu/Gatcha.css"
import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Alert from "../../Components/Alert"
import {
    chestClosed, chestOpened, playfulCloud, someonesGun, redBalloon, 
    fryingPan, ironSword, nightCap, wizardHat, pot, bananaPeel, diamondHelmet,
    bucketHat, crowCharacter, frogCharacter, capyBaraCharacter, raccoonCharacter, 
    coins, oneStar, twoStar, threeStar, fourStar 
} from "../../assets/Pictures"

const Gatcha = () => {  
    const URI = import.meta.env.VITE_URI
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
    

    const [usersCoins, setUsersCoins] = useState(100)
    const [gatchaAnimation, setGatchaAnimation] = useState(false)
    const [alertForInsufficientFunds, setAlertForInsufficientFunds] = useState(false)
    const [isChestOpen, setIsChestOpen] = useState(false)
    const [stars, setStars] = useState(null)
    const [itemWon, setItemWon] = useState(null)
    const [itemName, setItemName] = useState(null)
    const [theResultsPageOfTheGatcha, setTheResultsPageOfTheGatcha] = useState(false)
    const [coinsTextIfTheyAlreadyWonThatItem, setCoinsTextIfTheyAlreadyWonThatItem] = useState(null)

    const navigate = useNavigate()

    let coinsIfTheyAlreadyWonThatItem

    useEffect(() => {
        const fetchUsersCoins = async () => {
            try {
                const { data } = await axios.get(`${URI}/users/getUsersCoins/${userId}`)
                setUsersCoins(data)
            }
            catch (e) {
                console.error("error retreiving user's coins")
            }
        }
        fetchUsersCoins()
    }, [URI, userId])

    const handleRoll = async () => {
        setTheResultsPageOfTheGatcha(false)
        setCoinsTextIfTheyAlreadyWonThatItem(null)

        if (usersCoins < 100) {
            setAlertForInsufficientFunds(true)
            return
        }
        else {
            try {
                const { data } = await axios.put(`${URI}/users/updateCoins/${userId}`, -100)
                if (data.status === 200)
                    console.log("purchase loot box successful")
                
                theGamblingAlgorithm()

                //one star = 50, two stars = 75, three = 100 four == 300
                try {
                    const { characterData } = await axios.get(`${URI}/users/getCharacters/${userId}`)
                    const { inventoryData } = await axios.get(`${URI}/users/getInventory/${userId}`)
                    if (characterData.includes(itemWon) || inventoryData.includes(itemWon)) {
                        switch (stars) {
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
                }
                catch (e) {
                    console.error("failed to fetch the player's inventory")
                }

                if (coinsTextIfTheyAlreadyWonThatItem === null && stars === fourStar) {
                    try {
                        const { data } = await axios.put(`${URI}/users/addCharacter/${userId}`)
                        if (data.status === 200)
                            console.log("added new character to User's collection")
                    }
                    catch (e) {
                        console.error("error adding new character to User's collection", e)
                    }
                }
                else if (coinsTextIfTheyAlreadyWonThatItem === null) {
                    try {
                        const { data } = await axios.put(`${URI}/users/addItem/${userId}`)
                        if (data.status === 200)
                            console.log("added new item to User's collection")
                    }
                    catch (e) {
                        console.error("error adding new item to User's collection", e)
                    }
                }
                else {
                    try {
                        const { data } = await axios.put(`${URI}/users/updateCoins/${userId}`, coinsIfTheyAlreadyWonThatItem)
                        if (data.status === 200)
                            console.log("updated user's balance")
                    }
                    catch (e) {
                        console.error("error updating user's balance", e)
                    }
                }

                setGatchaAnimation(true)
                setTimeout(() => {
                    setIsChestOpen(true)
                }, 4500)
                setTimeout(() => {
                    setTheResultsPageOfTheGatcha(true)
                    setGatchaAnimation(false)
                    setIsChestOpen(false)
                }, 5000)
            }
            catch (e) {
                console.error("error buying lootbox", e)
            }
        }
    }

    const theGamblingAlgorithm = () => {
        const random = proababilityGeneratorPleaseDontLookAtThisReallyInefficientCode[Math.floor(Math.random() * proababilityGeneratorPleaseDontLookAtThisReallyInefficientCode.length)]
        let place
        let randomItem
        let nameOfTheRandomItem
        switch (random) {
            case (1):
                setStars(oneStar)
                place = Math.floor(Math.random() * oneStarItems.length)
                randomItem = oneStarItems[place]
                nameOfTheRandomItem = oneStarItemNames[place]
                break
            case (2):
                setStars(twoStar)
                place = Math.floor(Math.random() * twoStarItems.length)
                randomItem = twoStarItems[place]
                nameOfTheRandomItem = twoStarItemNames[place]
                break
            case (3):
                setStars(threeStar)
                place = Math.floor(Math.random() * threeStarItems.length)
                randomItem = threeStarItems[place]
                nameOfTheRandomItem = threeStarItemNames[place]
                break
            case (4):
                setStars(fourStar)
                place = Math.floor(Math.random() * fourStarItems.length)
                randomItem = fourStarItems[place]
                nameOfTheRandomItem = fourStarItemNames[place]
                break
            default:
                setStars(oneStar)
                place = Math.floor(Math.random() * oneStarItems.length)
                randomItem = oneStarItems[place]
                nameOfTheRandomItem = oneStarItemNames[place]
        }
        setItemWon(randomItem)
        setItemName(nameOfTheRandomItem)
    }

    return(
        <>
            <div className="gatcha-container">
                {!gatchaAnimation ? (<div className="back">
                    <button className="back-button" onClick={() => navigate('/collection')}>
                        <h1>&lt;</h1>
                    </button>
                </div>) : null }
                {alertForInsufficientFunds && (<Alert text={"Insufficient Funds!"} buttonOneText={"Ok"} functionButtonOne={() => {setAlertForInsufficientFunds(false)}}/>)}
                <div className="stuff-in-gatcha">
                    {theResultsPageOfTheGatcha ? (
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
                            <div className="button-for-gatcha">
                                <button onClick={handleRoll}>Buy Again? : 100 coins</button>
                            </div>
                        </>
                    ) : (
                        <>
                            {gatchaAnimation ? (
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
                                    <div className="button-for-gatcha">
                                        <button onClick={handleRoll}>Buy: 100 coins</button>
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

export default Gatcha