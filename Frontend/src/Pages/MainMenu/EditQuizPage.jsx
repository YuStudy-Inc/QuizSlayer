import "../../Styles/Pages/MainMenu/CreateQuizPage.css"
import { plus, download } from "../../assets/Pictures.js";
import { FlashCard, FlashCardCreationOverlay } from "../../Components/Components.js";
import { useEffect, useState } from 'react';
import { data, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditQuizPage = () => {
    const URI = import.meta.env.VITE_URI
    const { quizId } = useParams();
    const [quizData, setQuizData] = useState({
        title: "",
        description: "",
        completed: ""
    })
    const [questions, setQuestions] = useState([])
    const [showCardCreationOverlay, setShowCardCreationOverlay] = useState(false)

    useEffect(() => {
        const fetchQuiz = () => {
            try {
                const quiz = axios.get(`${URI}/quizzes/getQuiz/${quizId}`)
                setQuizData(quiz)
            }
            catch (e) {
                console.log("error retreiving quiz", e)
            }
        }
        fetchQuiz()
    }, [])

    useEffect(() => {
        const fetchQuestionsFromQuiz = () => {
            try {
                const q = axios.get(`${URI}/quizzes/getQuestionsFromQuiz/${quizId}`)
                setQuestions(q)
            }
            catch (e) {
                console.log("error retreiving questions for quiz", e)
            }
        }
        fetchQuestionsFromQuiz()
    }, [])


    const navigate = useNavigate()

    const handleQuizCreation = () => {
        /* backend stuff */
        navigate('/quizzes')
    }

    const handleChange = (e) => {
        setQuizData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const createCard = () => {
        setShowCardCreationOverlay(true)
    }

    const handleCardCreationClose = () => {
        setShowCardCreationOverlay(false)
    }

    
    return (
        <>
            <div className="create-quiz-container">
                <div className="back">
                    <button className="back-button" onClick={() => navigate('/quizzes')}>
                        <h1>&lt;</h1>
                    </button>
                </div>
                <div className="creation-of-flash-cards">

                    <div className="title-section">
                        <h1>Create Quiz</h1>
                    </div>
                    <div className="two-side-container">
                        <div className="left-side">
                            <label>
                                <p>Title</p>
                                <span><input type="text" onChange={handleChange} /></span>
                            </label>

                            <label>
                                <p>Description</p>
                                <span><input type="text" onChange={handleChange} /></span>
                            </label>

                            <div className="card-section">
                                <p>Cards</p>
                            </div>

                            <div className="flash-cards-create-container">
                                <div className="flash-cards">
                                    {/* flash card components go here */}
                                    <FlashCard questionInput={"what is 1 + 1"} answerInput={"2"} />
                                    <FlashCard questionInput={"what is 1 + 1"} answerInput={"2"} />
                                    <FlashCard questionInput={"what is 1 + 1"} answerInput={"2"} />
                                    <FlashCard questionInput={"what is 1 + 1"} answerInput={"2"} />
                                    <FlashCard questionInput={"what is 1 + 1"} answerInput={"2"} />
                                    <FlashCard questionInput={"what is 1 + 1"} answerInput={"2"} />
                                </div>
                            </div>
                            <div className="create-card">
                                <button className="create-card-button" onClick={createCard}>
                                    <img src={plus} alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="create-that-quiz">
                    <button className="create-that-quiz-button" onClick={handleQuizCreation}>
                        <h1>Create</h1>
                    </button>
                </div>
                {showCardCreationOverlay && (
                    <FlashCardCreationOverlay close={handleCardCreationClose}/>
                )}
            </div>
        </>
    )
}
export default EditQuizPage