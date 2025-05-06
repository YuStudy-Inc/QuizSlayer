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
  const [gameFinished, setGameFinished] = useState(false);
  useEffect(() => {
    function handleMessage(event) {
      try {
        const data = JSON.parse(event.data);
        const monstersSlainValue = Number(data?.payload?.monstersSlain);

        if (!isNaN(monstersSlainValue)) {
          localStorage.setItem("results", monstersSlainValue);
          setGameFinished(true);

          axios.put(`${URI}users/updateMonstersSlain/${userId}`, {
            monstersSlain: monstersSlainValue
          }, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then((response) => {
            console.log("Update Success:", response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
          })
          .catch((error) => {
            const response = error.response;
            console.error("Update failed:", response?.data || error.message);
          });

          navigate("/results");
        } else {
          console.error("Invalid monstersSlain value received:", data?.payload?.monstersSlain);
        }

      } catch (err) {
        console.warn("Invalid message received:", event.data);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [URI, userId, navigate]);

  return (
    <>
      <div className="game-page-container">
          {!gameFinished && (
        <iframe
           src={`${GAME_URI}?sessionId=${quizId}&character=${character}&weapon=${weapon}&hat=${hat}`}
          style={{ width: "100%", height: "100vh", border: "none" }}
          title="My Game"
        />
  )}
      </div>
    </>
  );
};

export default GamePage;
