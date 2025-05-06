import "../Styles/Pages/GamePage.css";
import { useEffect, useState } from "react";
import Alert from "../Components/Alert";
import UserData from "../UserData";
import axios from "axios"
const GAME_URI = import.meta.env.VITE_GAME_URI || ''; // Get the game URI from environment variables
const quizId = localStorage.getItem('quizId'); // Retrieve user ID from localStorage
const user = JSON.parse(localStorage.getItem('user'));
import { useNavigate } from "react-router-dom"; 
const GamePage = () => {
  const URI = import.meta.env.VITE_APP_URI || '';
  const navigate = useNavigate();
  const character = user.selectedCharacter;
  const weapon = user.selectedWeapon;
  const hat = user.selectedHat;
  const userId = JSON.parse(localStorage.getItem('id'));
  console.log(`${GAME_URI}?sessionId=${quizId}&character=${character}&weapon=${weapon}&hat=${hat}`);
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
        // setAlertText("Monsters Slain: ", score);
        localStorage.setItem('results',score )
        setShowAlert(true);
        setGameFinished(true);
        axios({
          method: "put",
          url: `${URI}users/updateMonstersSlain/${userId}`,
          data: {
            "monsterSlain": score
          },
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then((response) => {
          console.log("Update Success:", response.data);
 
          // Update local storage or UI with new user data if needed
          localStorage.setItem('user', JSON.stringify(response.data));
        })
        .catch((error) => {
          const response = error.response;
          // alert("It did not work")
          if (response) {
            console.log(response.data);
            console.log(response.status);
            console.log(response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
        navigate('/results'); 

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
           src={`${GAME_URI}?sessionId=${quizId}&character=${character}&weapon=${weapon}&hat=${hat}`}
          style={{ width: "100%", height: "100vh", border: "none" }}
          title="My Game"
        />
  )}
      </div>
      {/* {score !== null && (
        <div className="score-display">
          🎉 Final Score: {score}
        </div>
      )} */}
    </>
  );
};

export default GamePage;
