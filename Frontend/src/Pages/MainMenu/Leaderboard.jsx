import "../../Styles/Pages/MainMenu/Leaderboard.css"
import { PlayerCard } from "../../Components/Components"

const Leaderboard = () => {
    return (
        <>
            <div className="leaderboard-container">
                <div className ="full-leaderboard">
                    <h1 className="title-leaderboard">Top 10</h1>
                    <div className="player-score-list">
                            <PlayerCard rank="1" score = {0} playerName = "ToxicController" url = "/" />
                            <PlayerCard rank="2" score = {0} playerName = "Player" url = "/" />
                            <PlayerCard rank="3" score = {0} playerName = "Player" url = "/" />
                            <PlayerCard rank="4" score = {0} playerName = "Player" url = "/" />
                            <PlayerCard rank="5" score = {0} playerName = "Player" url = "/" />
                            <PlayerCard rank="6" score = {0} playerName = "Player" url = "/" />
                            <PlayerCard rank="7" score = {0} playerName = "Player" url = "/" />
                            <PlayerCard rank="8" score = {0} playerName = "Player" url = "/" />
                            <PlayerCard rank="9" score = {0} playerName = "Player" url = "/" />
                            <PlayerCard rank="10" score = {0} playerName = "Player" url = "/" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Leaderboard;