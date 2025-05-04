import "../Styles/Pages/GamePage.css"

import { useEffect, useState } from "react"
const GAME_URI = import.meta.env.VITE_GAME_URI || '';
const userId = JSON.parse(localStorage.getItem('id'));
const GamePage = () => {
  
    
    return (
        <>
            <div className="game-page-container">
            <iframe
            src={`${GAME_URI}=${userId}`}
            style={{ width: "100%", height: "100vh", border: "none" }}
            title="My Game"
            />
            </div>
        </>
    )
}

export default GamePage