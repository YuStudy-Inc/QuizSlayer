import "../../Styles/Components/Leaderboard/PlayerCard.css"
import playerIcon from "../../assets/Characters/frogCharacter.png" 
const PlayerCard = ({rank, score, playerName }) => {

    //nah we don't need this
    /* const handleClick = () => {
        window.location.href = url; // Redirects to external links
    }; */

    //Player img is just temporary
    return (
        <>
            <div className="player-card-container">
                <span className="ranking">
                    <h1>{rank}</h1>
                </span>
                <span className="player-info">
                    <img className="player-img" src={playerIcon} alt="" /> 
                    <span className="player-name"> 
                        <p>{playerName}</p>
                    </span>
                </span>
                <span className="player-score"> 
                    <p> Monsters Slain {score} </p>
                </span>
            </div>
            <div className="player-card-container-mobile">
                <span className="ranking">
                    <h1>{rank}</h1>
                </span>
                <span className="player-info">
                    <img className="player-img" src={playerIcon} alt="" /> 
                </span>
                <span className="player-text-mobile">
                    <span className="player-name-mobile"> 
                        <p>{playerName}</p>
                    </span>
                    <span className="player-score-mobile"> 
                        <p> Monsters Slain {score} </p>
                    </span>
                </span>
            </div>
        </>
    )
}

export default PlayerCard