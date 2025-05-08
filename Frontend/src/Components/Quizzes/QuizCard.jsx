import "../../Styles/Components/Quizzes/QuizCard.css"
import { playButton, pencil, trash } from "../../assets/Pictures"
import { useNavigate } from "react-router-dom"; 

const QuizCard = ({ id, title, url, editThatQuiz, deleteThatQuiz }) => {
    const navigate = useNavigate();

    const handlePlayClick = () => {
        localStorage.setItem('quizId', id);
          window.location.href = url; // Redirects to external links
    };

    const handleViewQuiz = () => {
        navigate(`./${id}`)
    }


    return (
        <>
          <div className="quiz-card-container" onClick={handleViewQuiz}>
            <div className="quiz-stuff">
                <span className="quiz-text"> {title}</span>
                <div className="options-for-quiz-card">
                    <button className="delete-button" onClick={(e) => {e.stopPropagation(); deleteThatQuiz()}}>
                        <img src={trash} alt="" />
                    </button>
                    <button className="edit-button" onClick={(e) => {e.stopPropagation(); editThatQuiz()}}>
                        <img src={pencil} alt="" />
                    </button>
                    <button className="play-button" onClick={(e) => {e.stopPropagation(); handlePlayClick()}}>
                        <img src={playButton} alt="" />
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default QuizCard