import "../../Styles/Pages/MainMenu/Quizzes.css"
import { QuizCard } from "../../Components/Components"
import { pencil } from "../../assets/Pictures"
import { useNavigate } from "react-router-dom"

const Quizzes = () => {
	const navigate = useNavigate();

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
								<QuizCard id={1} category={"Testing"} title={"First Card"} url="/" editThatQuiz={editThatQuiz}/>
								<QuizCard id={2} category={"Testing"} title={"First Card"} url="/" editThatQuiz={editThatQuiz}/>
								<QuizCard id={3} category={"Testing"} title={"First Card"} url="/" editThatQuiz={editThatQuiz}/>
								<QuizCard id={4} category={"Testing"} title={"First Card"} url="/" editThatQuiz={editThatQuiz}/>

							</div>
						</div>
						<div className="container-for-quiz-card">
							<h1 className="in-progress-quizzes quiz-progress-titles">In Progress</h1>
							<div className="quizCards">
								<QuizCard id={5} category={"Testing"} title={"First Card"} url="/home" editThatQuiz={editThatQuiz}/>
								<QuizCard id={6} category={"Testing"} title={"First Card"} url="/home" editThatQuiz={editThatQuiz}/>

							</div>
						</div>
						<div className="container-for-quiz-card">
							<h1 className="finished-quizzes quiz-progress-titles">Finished</h1>
							<div className="quizCards">
								<QuizCard id={7} category={"Testing"} title={"First Card"} url="/home" editThatQuiz={editThatQuiz}/>

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