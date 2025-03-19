import "../styles/Components/PlayerCard.css"
import playerIcon from "../assets/Characters/frogCharacter.png"
import { useNavigate } from "react-router-dom"; 
const PlayerCard = ({score, playerName, url }) => {

    const handleClick = () => {
        window.location.href = url; // Redirects to external links
    };

    //Player img is just temporary
    return (
        <>
            <button className="player-card-container" onClick = {handleClick}>
                <div className="player-card">
                    <span className = "player-info">
                        <img className="player-img" src={playerIcon} alt="" /> 
                        <span className="player-name"> {playerName}</span>
                    </span>
                    <span className="player-score"> Monsters Slain #{score} </span>
                </div>
            </button>
        </>
    )
}

export default PlayerCard