import "../../Styles/Pages/MainMenu/Leaderboard.css"
import { PlayerCard } from "../../Components/Components"
import {useState, useEffect} from "react"
import axios from "axios"

const URI = import.meta.env.VITE_APP_URI

const Leaderboard = () => {
    const [leaderBoard, setLeaderBoard] = useState([])

    useEffect(() => {
        const getLeaderBoard = async () => {
            try {
                const response = await axios.get(`${URI}users/getTop10`)
                if (response.status === 200)
                    setLeaderBoard(response.data.top10Players)
            }
            catch (e) {
                console.error("Error fetching leaderboard", e)
            }
        }
        getLeaderBoard()
    }, [URI])


    return (
        <>
            <div className="leaderboard-container">
                <div className ="full-leaderboard">
                    <h1 className="title-leaderboard">Top 10</h1>
                    <div className={`player-score-list ${leaderBoard.length === 0 ? "no-score" : ""}`}>
                        {leaderBoard.length !== 0 ? (
                            <>
                            <div className="column">
                              {leaderBoard.slice(0, 5).map((player, index) => (
                                <PlayerCard
                                  key={index}
                                  rank={index + 1}
                                  playerName={player.username}
                                  playerPfp={player.pfp}
                                  monstersSlain={player.monstersSlain}
                                />
                              ))}
                            </div>
                            <div className="column">
                              {leaderBoard.slice(5).map((player, index) => (
                                <PlayerCard
                                  key={index + 5}
                                  rank={index + 6}
                                  playerName={player.username}
                                  playerPfp={player.pfp}
                                  monstersSlain={player.monstersSlain}
                                />
                              ))}
                            </div>
                          </>
                        ) : (
                            <h1 className="no-one-is-winning">No Player Data Available</h1>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Leaderboard;