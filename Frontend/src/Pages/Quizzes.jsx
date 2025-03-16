import Navbar from "../Components/Navbar"
import "../Styles/Pages/Quizzes.css"
import QuizCard from "../Components/QuizCard"
import pencil from "../assets/Quizzes/pencil.png"
const categories = [
	{
		title: "Category 1",
		cards: [
			{ text: "Card 1A", color: "bg-blue-500" },
			{ text: "Card 1B", color: "bg-green-500" },
		],
	},
	{
		title: "Category 2",
		cards: [
			{ text: "Card 2A", color: "bg-red-500" },
			{ text: "Card 2B", color: "bg-yellow-500" },
		],
	},
	{
		title: "Category 3",
		cards: [
			{ text: "Card 3A", color: "bg-purple-500" },
			{ text: "Card 3B", color: "bg-pink-500" },
		],
	},
];
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
                    <button className="create-quiz-button">
                        <img src={pencil} alt="" />
                    </button>
                </div>
			</div>
		</>
	)
}

export default Quizzes