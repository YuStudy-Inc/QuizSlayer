import Navbar from "../Components/Navbar"
import "../Styles/Pages/Quizzes.css"
import QuizCard from "../Components/QuizCard"
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
    return(
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto p-4 quiz-container">
            <h1>Your Quizzes</h1>
                <div className="container-for-quiz-card">
                    <h2>FINISHED</h2>
                    <QuizCard category={"Testing"} title={"First Card"} url = "https://www.youtube.com/"/>
                </div>
                <div className="container-for-quiz-card">
                    <h2>IN PROGRESS</h2>
                    <QuizCard category={"Testing"} title={"First Card"} url ="/home"/>
                </div>
                <div className="container-for-quiz-card">
                    <h2>TODO</h2>
                    <QuizCard category={"Testing"} title={"First Card"}/>
                </div>
            </div>
        </>
    )
}

export default Quizzes