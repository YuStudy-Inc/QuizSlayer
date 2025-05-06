import "../../Styles/Pages/Results/Results.css"
import { Podium, ResultCard } from "../../Components/Components"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const URI = import.meta.env.VITE_APP_URI
const userId = JSON.parse(localStorage.getItem('id'));

const Results = () => {
    const win = "You beat the Quiz!"
    const lose = "Better luck next time..."
    const monstersSlain = localStorage.getItem('results') || 0;
    const navigate = useNavigate()
    const goHome =() =>{
        navigate('/home')
    }
    console.log("Monsters slain", monstersSlain)
    const [totalCoins, setTotalCoins] = useState(0)

    useEffect(() => {
        const coinsEarned = monstersSlain * 3
        setTotalCoins(coinsEarned)

        const updateCoins = async () => {
            try {
                const response = await axios.put(`${URI}users/updateCoins/${userId}`, {
                    coins: coinsEarned,
                }, 
                { 
                    withCredentials: true 
                })
                if (response.status === 200) {
                    console.log("Coins updated successfully")
                }
            } catch (error) {
                console.error("Failed to update coins:", error)
            }
        }

        if (coinsEarned > 0) updateCoins()
    }, [monstersSlain])

    return(
        <>
            <div className="results-container">
                <div className="results-title">
                    <h1>{monstersSlain>=2 ? win : lose}</h1>
                </div>
                <div className="show-results">
                    <div className="container-for-cards-and-character">
                        <div className="container-for-podium-results-page">
                            <Podium />
                        </div>
                        <div className="container-for-result-card">
                            <ResultCard didWin={true} coins={totalCoins} monsters={monstersSlain}/>
                        </div>
                    </div>
                </div>
                <button className="from-results-to-home" onClick={goHome}>Continue</button>
            </div>
        </>
    ) 
}

export default Results
