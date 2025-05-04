import "../../Styles/Components/Quizzes/QuizCard.css"
import { playButton, pencil, trash } from "../../assets/Pictures"
import { useNavigate } from "react-router-dom"; 

const QuizCard = ({ title, url, editThatQuiz, deleteThatQuiz }) => {
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
                    <button className="delete-button" onClick={() => deleteThatQuiz()}>
                        <img src={trash} alt="" />
                    </button>
                    <button className="edit-button" onClick={() => editThatQuiz()}>
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