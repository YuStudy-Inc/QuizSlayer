import "../../Styles/Pages/MainMenu/Quizzes.css"
import { QuizCard } from "../../Components/Components"
import { pencil } from "../../assets/Pictures"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const Quizzes = () => {
	const URI = import.meta.env.VITE_URI
	const navigate = useNavigate();
	const [quizzes, setQuizzes] = useState([])

	useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const { data } = await axios.get(`${URI}/quizzes/getQuizzes/${userId}`)
                setQuizzes(data)
            }
            catch (e) {
                console.log("error retreiving questions for quiz", e)
            }
        }
        fetchQuizzes()
    }, [URI, userId])


	const editThatQuiz = (id) => {
		navigate(`/editquiz/${id}`)
	}



	return (
		<>
			<div className="quiz-container">
				<div className="all-the-quizzes">
					<h1 className="title-quizzes">Your Quizzes</h1>
					<div className="quizlist">
						<div className="container-for-quiz-card">
							<h1 className="todo-quizzes quiz-progress-titles">Todo</h1>
							<div className="quizCards">
								{quizzes.map((quiz) => !quiz.completed ? (
									<QuizCard key={quiz._id} id={quiz._id} userId={userId} title={quiz.title} url="/" editThatQuiz={() => editThatQuiz(quiz._id)}/>
								) : null )}
							</div>
						</div>
						<div className="container-for-quiz-card">
							<h1 className="finished-quizzes quiz-progress-titles">Finished</h1>
							<div className="quizCards">
								{quizzes.map((quiz) => quiz.completed ? (
									<QuizCard key={quiz._id} id={quiz._id} userId={userId} title={quiz.title} url="/" editThatQuiz={() => editThatQuiz(quiz._id)}/>
								) : null )} 
							</div>
						</div>
					</div>

				</div>
				<div className="create-quiz">
                    <button className="create-quiz-button" onClick={() => window.location.href = "/createquiz"}>
                        <img src={pencil} alt="" />
                    </button>
                </div>
			</div>
		</>
	)
}

export default Quizzes