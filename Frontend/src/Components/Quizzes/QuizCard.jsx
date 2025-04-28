import "../../Styles/Components/Quizzes/QuizCard.css"
import { playButton, pencil } from "../../assets/Pictures"
import { useNavigate } from "react-router-dom"; 

const QuizCard = ({key, id, userId, title, url, editThatQuiz }) => {
    const navigate = useNavigate();

    const handlePlayClick = () => {
        window.location.href = url; // Redirects to external links
    };


    return (
        <>
          <div className="quiz-card-container">
            <div className="quiz-stuff">
                <span className="quiz-text"> {title}</span>
                <div className="options-for-quiz-card">
                    <button className="edit-button" onClick={() => editThatQuiz(userId)}>
                        <img src={pencil} alt="" />
                    </button>
                    <button className="play-button" onClick={handlePlayClick}>
                        <img src={playButton} alt="" />
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default QuizCard