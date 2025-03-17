import Navbar from "../../Components/Navbar"
import "../../Styles/Pages/Quizzes.css"
import QuizCard from "../../Components/QuizCard"
import pencil from "../../assets/Quizzes/pencil.png"

const Quizzes = () => {
	return (
		<>
			<Navbar />
			<div className="quiz-container">
				<div className="all-the-quizzes">
					<h1 className="title-quizzes">Your Quizzes</h1>
					<div className="quizlist">
						<div className="container-for-quiz-card">
							<h1 className="todo-quizzes quiz-progress-titles">Todo</h1>
							<div className="quizCards">
								<QuizCard category={"Testing"} title={"First Card"} url="https://www.youtube.com/" />
								<QuizCard category={"Testing"} title={"First Card"} url="https://www.youtube.com/" />
								<QuizCard category={"Testing"} title={"First Card"} url="https://www.youtube.com/" />
								<QuizCard category={"Testing"} title={"First Card"} url="https://www.youtube.com/" />

							</div>
						</div>
						<div className="container-for-quiz-card">
							<h1 className="in-progress-quizzes quiz-progress-titles">In Progress</h1>
							<div className="quizCards">
								<QuizCard category={"Testing"} title={"First Card"} url="/home" />
								<QuizCard category={"Testing"} title={"First Card"} url="/home" />

							</div>
						</div>
						<div className="container-for-quiz-card">
							<h1 className="finished-quizzes quiz-progress-titles">Finished</h1>
							<div className="quizCards">
								<QuizCard category={"Testing"} title={"First Card"} />

							</div>
						</div>
					</div>

				</div>
				<div className="create-quiz">
                    <button className="create-quiz-button" onClick={() => window.location.href = "/createQuizPage"}>
                        <img src={pencil} alt="" />
                    </button>
                </div>
			</div>
		</>
	)
}

export default Quizzes