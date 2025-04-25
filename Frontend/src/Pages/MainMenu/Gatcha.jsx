import "../../Styles/Pages/MainMenu/Gatcha.css"
import { useState, useEffect } from "react"
import {
    chestClosed, chestOpened, playfulCloud, someonesGun, redBalloon, 
    fryingPan, ironSword, nightCap, wizardHat, pot, bananaPeel, diamondHelmet,
    bucketHat, crowCharacter, frogCharacter, capyBaraCharacter, raccoonCharacter, coins 
} from "../../assets/Pictures"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Alert from "../../Components/Alert"
import { motion } from "motion/react"


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

    const proababilityGeneratorPleaseDontLookAtThisReallyInefficientCode = [
        1, 1, 1, 1, 3, 1, 1, 2, 1, 1,
        1, 2, 1, 1, 1, 1, 3, 1, 2, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 4, 1,
        1, 2, 1, 1, 1, 1, 3, 1, 1, 2,
        1, 1, 1, 1, 1, 1, 2, 1, 1, 3,
        1, 1, 2, 1, 4, 3, 1, 1, 1, 2,
        3, 1, 1, 1, 2, 1, 1, 4, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 4, 1,
        1, 3, 1, 2, 3, 2, 1, 1, 2, 1,
        2, 1, 3, 2, 1, 1, 4, 3, 2, 1
    ]
    

    const [usersCoins, setUsersCoins] = useState(100)
    const [gatchaAnimation, setGatchaAnimation] = useState(false)
    const [alertForInsufficientFunds, setAlertForInsufficientFunds] = useState(false)
    const [isChestOpen, setIsChestOpen] = useState(false)
    const [itemWon, setItemWon] = useState(null)

    const navigate = useNavigate()

    /* useEffect(() => {
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
    }, [URI, userId]) */

    const handleRoll = () => {
        if (usersCoins < 100) {
            setAlertForInsufficientFunds(true)
            return
        }
        else {
            theGamblingAlgorithm() 
            setGatchaAnimation(true)
            setTimeout(() => {
                setIsChestOpen(true)
            }, 4500)
            

        }
    }

    const theGamblingAlgorithm = () => {
        const random = array[Math.floor(Math.random() * proababilityGeneratorPleaseDontLookAtThisReallyInefficientCode.length)]
        let randomItem;
        switch (random) {
            case (1):
                randomItem = array[Math.floor(Math.random() * oneStarItems.length)]
            case (2):
                randomItem = array[Math.floor(Math.random() * twoStarItems.length)]
            case (3):
                randomItem = array[Math.floor(Math.random() * threeStarItems.length)]
            case (4):
                randomItem = array[Math.floor(Math.random() * fourStarItems.length)]
            default:
                randomItem = array[Math.floor(Math.random() * oneStarItems.length)]
        }
        setItemWon(randomItem)
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
                </div>
            </div>
        </>
    )
}

export default Gatcha