import "../../Styles/Pages/MainMenu/Quizzes.css"
import { QuizCard } from "../../Components/Components"
import { pencil } from "../../assets/Pictures"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const URI = import.meta.env.VITE_APP_URI
const userId = JSON.parse(localStorage.getItem('id'));

const Quizzes = () => {
	const navigate = useNavigate();
	const [quizzes, setQuizzes] = useState([])

	useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get(`${URI}quizzes/getQuizzes/${userId}`, {
                    withCredentials: true
                })
				if (response.status === 200) {
                	setQuizzes(response.data.quizzes)
				}

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

	const deleteThatQuiz = async (quizId) => {
		console.log(quizId)
		try {
			const response = await axios.delete(`${URI}quizzes/deleteQuiz`, {
				data: { quizId },
                withCredentials: true
			})
			if (response.status === 200) {
				console.group("quiz deleted")

				const quizzesWithoutThatOneQuiz = quizzes.filter(quiz => quiz._id !== quizId)
				setQuizzes(quizzesWithoutThatOneQuiz)
			}

		}
		catch (e) {
			console.error("quiz was NOT deleted 🥀🥀🥀")
		}
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
									<QuizCard key={quiz._id} id={quiz._id} userId={userId} title={quiz.title} url="/" editThatQuiz={() => editThatQuiz(quiz._id)} deleteThatQuiz={() => {deleteThatQuiz(quiz._id)}}/>
								) : null )}
							</div>
						</div>
						<div className="container-for-quiz-card">
							<h1 className="finished-quizzes quiz-progress-titles">Finished</h1>
							<div className="quizCards">
								{quizzes.map((quiz) => quiz.completed ? (
									<QuizCard key={quiz._id} id={quiz._id} userId={userId} title={quiz.title} url="/" editThatQuiz={() => editThatQuiz(quiz._id)} deleteThatQuiz={() => {deleteThatQuiz(quiz._id)}}/>
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