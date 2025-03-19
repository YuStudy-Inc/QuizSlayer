import "../../Styles/Pages/Leaderboard.css"
import PlayerCard from "../../Components/PlayerCard"
const Leaderboard = () => {
    return (
        <>
            <div className = "leaderboard-container">
                <div className ="full-leaderboard">
                    <h1 className = "title-leaderboard">Top 10</h1>
                    <div className = "player-score-list">
                        <div className = "container-for-player-card">
                            <PlayerCard score = {0} playerName = "Player" url = "/" />
                        </div>
                        <div className = "container-for-player-card">
                            <PlayerCard score = {0} playerName = "Player" url = "/" />
                        </div>
                        <div className = "container-for-player-card">
                            <PlayerCard score = {0} playerName = "Player" url = "/" />
                        </div>
                        <div className = "container-for-player-card">
                            <PlayerCard score = {0} playerName = "Player" url = "/" />
                        </div>
                        <div className = "container-for-player-card">
                            <PlayerCard score = {0} playerName = "Player" url = "/" />
                        </div>
                        <div className = "container-for-player-card">
                            <PlayerCard score = {0} playerName = "Player" url = "/" />
                        </div>
                        <div className = "container-for-player-card">
                            <PlayerCard score = {0} playerName = "Player" url = "/" />
                        </div>
                        <div className = "container-for-player-card">
                            <PlayerCard score = {0} playerName = "Player" url = "/" />
                        </div>
                        <div className = "container-for-player-card">
                            <PlayerCard score = {0} playerName = "Player" url = "/" />
                        </div>
                        <div className = "container-for-player-card">
                            <PlayerCard score = {0} playerName = "Player" url = "/" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Leaderboard;