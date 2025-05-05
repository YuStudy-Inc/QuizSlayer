import "../../Styles/Pages/MainMenu/CreateQuizPage.css"
import { FlashCard } from "../../Components/Components.js";
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const URI = import.meta.env.VITE_APP_URI

const ViewQuizPage = () => {
    const { quizId } = useParams();
    const [quizData, setQuizData] = useState({
        title: "",
        description: "",
        completed: ""
    })
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        if (!quizId) return

        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`${URI}quizzes/getQuiz/${quizId}`)
                if (response.status === 200)
                    setQuizData(response.data.quizzes)
            }
            catch (e) {
                console.log("error retreiving quiz", e)
            }
        }
        fetchQuiz()
    }, [quizId, URI])

    useEffect(() => {
        if (!quizId) return

        const fetchQuestionsFromQuiz = async () => {
            try {
                const response = await axios.get(`${URI}quizzes/getQuestionsFromQuiz/${quizId}`)
                if (response.status === 200)
                    setQuestions(response.data.questions)
            }
            catch (e) {
                console.log("error retreiving questions for quiz", e)
            }
        }
        fetchQuestionsFromQuiz()
    }, [quizId, URI])


    const navigate = useNavigate()
    
    return (
        <>
            <div className="create-quiz-container">
                <div className="back">
                    <button className="back-button" onClick={() => navigate('/quizzes')}>
                        <h1>&lt;</h1>
                    </button>
                </div>
                <div className="creation-of-flash-cards">
                    <div className="two-side-container">
                        <div className="left-side">
                            <div className="title-section">
                                <h1>{quizData.title}</h1>
                            </div>
                            <div className="title-section">
                                <h2>{quizData.description}</h2>
                            </div>

                            <div className="card-section">
                                <p>Cards</p>
                            </div>

                            <div className="flash-cards-create-container">
                                <div className="flash-cards">
                                    {questions.map((question, index) => (
                                        <FlashCard key={index} questionInput={question.questionPrompt} answerInput={question.answer} editing={false} onEdit={() => {}}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ViewQuizPage