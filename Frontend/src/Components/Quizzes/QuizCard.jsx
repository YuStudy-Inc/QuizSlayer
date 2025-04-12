import "../../Styles/Components/Quizzes/QuizCard.css"
import { playButton } from "../../assets/Pictures"
import { useNavigate } from "react-router-dom"; 

const QuizCard = ({category, title, url }) => {
    const navigate = useNavigate();

    const handlePlayClick = () => {
        window.location.href = url; // Redirects to external links
    };
    return (
        <>
          <div className="quiz-card-container">
            <div className="quiz-stuff">
                <span className="quiz-text"> {title}</span>
                <button className="play-button" onClick={handlePlayClick}>
                    <img src={playButton} alt="" />
                </button>
            </div>
        </div>
        </>
    )
}

export default QuizCard