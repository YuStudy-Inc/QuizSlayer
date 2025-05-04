import "../Styles/Pages/GamePage.css";
import { useEffect, useState } from "react";
import Alert from "../Components/Alert";
const GAME_URI = import.meta.env.VITE_GAME_URI || ''; // Get the game URI from environment variables
const userId = JSON.parse(localStorage.getItem('id')); // Retrieve user ID from localStorage

const GamePage = () => {
  const [showAlert, setShowAlert] = useState(true)
	const [alertText, setAlertText] = useState('')
  const [gameFinished, setGameFinished] = useState(false);
  const closeAlert = () => {
		setShowAlert(false);
	};

  const [score, setScore] = useState(null);
  useEffect(() => {
    function handleMessage(event) {
      try {
        const data = JSON.parse(event.data);
        setScore(data.payload.monstersSlain);
        setAlertText("Monsters Slain: ", score);
        setShowAlert(true);
        setGameFinished(true);
        // console.log("Data: ", data.payload.monstersSlain);
      } catch (err) {
        console.warn("Invalid message received:", event.data);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
    	{showAlert && (
				<Alert
					text={alertText}
					buttonOneText="OK"
					functionButtonOne={closeAlert}
				/>
			)}
      <div className="game-page-container">
          {!gameFinished && (
        <iframe
          src={`${GAME_URI}?sessionId=${userId}`}
          style={{ width: "100%", height: "100vh", border: "none" }}
          title="My Game"
        />
  )}
      </div>
      {score !== null && (
        <div className="score-display">
          🎉 Final Score: {score}
        </div>
      )}
    </>
  );
};

export default GamePage;
