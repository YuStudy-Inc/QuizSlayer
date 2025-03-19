import "../styles/Components/PlayerCard.css"
import playerIcon from "../assets/Characters/frogCharacter.png"
import { useNavigate } from "react-router-dom"; 
const PlayerCard = ({rank, score, playerName, url }) => {

    const handleClick = () => {
        window.location.href = url; // Redirects to external links
    };

    //Player img is just temporary
    return (
        <>
            <button className="player-card-container" onClick = {handleClick}>
                <span className = "player-info">
                    <h1>{rank}</h1>
                    <img className="player-img" src={playerIcon} alt="" /> 
                    <span className="player-name"> 
                        <p>{playerName}</p>
                    </span>
                </span>
                <span className="player-score"> 
                    <p> Monsters Slain {score} </p>
                </span>
            </button>
        </>
    )
}

export default PlayerCard