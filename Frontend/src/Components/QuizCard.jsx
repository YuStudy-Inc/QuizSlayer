import "../Styles/Components/QuizzesCard.css"
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
                <button className="play-button" onClick={handlePlayClick}>▶ Play</button>
            </div>
        </div>
        </>
    )
}

export default QuizCard