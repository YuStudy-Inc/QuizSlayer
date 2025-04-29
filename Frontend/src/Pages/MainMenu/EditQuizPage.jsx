import "../../Styles/Pages/MainMenu/CreateQuizPage.css"
import { plus } from "../../assets/Pictures.js";
import { FlashCard, FlashCardCreationOverlay, FlashCardEditOverlay } from "../../Components/Components.js";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const URI = import.meta.env.VITE_APP_URI

const EditQuizPage = () => {
    //I need to find a way to make sure the owner of the quiz can edit it, we don't want people to write to other's quizzes

    const { quizId } = useParams();
    const [quizData, setQuizData] = useState({
        title: "",
        description: "",
        completed: ""
    })
    const [questions, setQuestions] = useState([])
    const [cardBeingEdited, setCardBeingEdited] = useState(null)
    const [showCardCreationOverlay, setShowCardCreationOverlay] = useState(false)

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`${URI}quizzes/getQuiz/${quizId}`)
                if (response.status === 200)
                    setQuizData(response.data)
            }
            catch (e) {
                console.log("error retreiving quiz", e)
            }
        }
        fetchQuiz()
    }, [URI, quizId])

    useEffect(() => {
        const fetchQuestionsFromQuiz = async () => {
            try {
                const response = await axios.get(`${URI}quizzes/getQuestionsFromQuiz/${quizId}`)
                if (response.status === 200)
                    setQuestions(response.data)
            }
            catch (e) {
                console.log("error retreiving questions for quiz", e)
            }
        }
        fetchQuestionsFromQuiz()
    }, [URI, quizId])


    const navigate = useNavigate()

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

    const handleEditCardOverlay = (id) => {
        setCardBeingEdited(id)
    }

    const handleEditCardClose = () => {
        setCardBeingEdited(null)
    }

    const handleQuizSaveChanges = async () => {
        try {
            const quizResponse = await axios.put(`${URI}quizzes/editQuiz/${quizId}`, quizData )
            if (quizResponse.status === 200) {
                console.log("successfully edited Quiz")
            }

            const questionsResponse = await axios.put(`${URI}questions/editQuestion/`, {
                questions: questions
            })
            if (questionsResponse.status === 200) {
                console.log("successfully edited Quiz")
            }
            navigate(-1)
        }
        catch (e) {
            console.error("error saving changes to quiz", e)
        }
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
                        <h1>Edit Quiz</h1>
                    </div>
                    <div className="two-side-container">
                        <div className="left-side">
                            <label>
                                <p>Title</p>
                                <span><input type="text" name="title" value={quizData.title ? quizData.title : ""} onChange={handleChange} /></span>
                            </label>

                            <label>
                                <p>Description</p>
                                <span><input type="text" name="description" value={quizData.description ? quizData.description : ""} onChange={handleChange} /></span>
                            </label>

                            <div className="card-section">
                                <p>Cards</p>
                            </div>

                            <div className="flash-cards-create-container">
                                <div className="flash-cards">
                                    {questions.map((question) => (
                                        <FlashCard key={question._id} id={question._id} questionInput={question.questionPrompt} answerInput={question.answer} editing={true} onEdit={() => {handleEditCardOverlay(question._id)}} />
                                    ))}
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
                    <button className="edit-that-quiz-button" onClick={handleQuizSaveChanges}>
                        <h1>Save Changes</h1>
                    </button>
                </div>
                {showCardCreationOverlay && (
                    <FlashCardCreationOverlay close={handleCardCreationClose}/>
                )}
                 {cardBeingEdited && (<FlashCardEditOverlay id={cardBeingEdited} close={handleEditCardClose}/>)}
            </div>
        </>
    )
}
export default EditQuizPage