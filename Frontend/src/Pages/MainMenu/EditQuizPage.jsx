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

    const cardsEdited = []
    const cardsDeleted = []
    const cardsAdded = []

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

    const handleCardDeletion = (questionId) => {
        cardsDeleted.push(questionId)
        const newListOfQuestions = questions.filter(question => question._id !== questionId)
        setQuestions(newListOfQuestions)
    }

    const handleQuizSaveChanges = async () => {
        try {
            const quizResponse = await axios.put(`${URI}quizzes/editQuiz/${quizId}`, {
                title: quizData.title,
                description: quizData.description,
            },
            {
                withCredentials: true
            })

            if (quizResponse.status === 200) {
                console.log("successfully edited Quiz")
            }

            const updatedQuizId = quizResponse.data.quiz._id
            
            const updatedQuestionsWithNewId = cardsAdded.map(question => ({
				...question,
				quizId: updatedQuizId
			}))

            const editedQuestionsResponse = await axios.put(`${URI}questions/editQuestions`, {
                questions: cardsEdited
            })
            if (editedQuestionsResponse.status === 200) {
                console.log("successfully added edited questions to Quiz")
            }
            const deletedQuestionsResponse = await axios.put(`${URI}questions/deleteQuestions`, {
                questions: cardsDeleted
            })
            if (deletedQuestionsResponse.status === 200) {
                console.log("successfully added edited questions to Quiz")
            }
            const createdQuestionsResponse = await axios.put(`${URI}questions/createQuestions`, {
                questions: updatedQuestionsWithNewId
            })
            if (createdQuestionsResponse.status === 200) {
                console.log("successfully added edited questions to Quiz")
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
                                    {questions.map((question, index) => (
                                        <FlashCard key={index} questionInput={question.questionPrompt} answerInput={question.answer} editing={true} onEdit={() => {handleEditCardOverlay(index, quizId, question._id, question.questionPrompt, question.answer, questions, setQuestions, cardsEdited)}} onDelete={() => {handleCardDeletion(question._id)}}/>
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
                    <FlashCardCreationOverlay makeNewCard={setQuestions} areYouEditing={true} createdCardsList={cardsAdded} close={handleCardCreationClose}/>
                )}
                 {cardBeingEdited && (<FlashCardEditOverlay id={cardBeingEdited} close={handleEditCardClose}/>)}
            </div>
        </>
    )
}
export default EditQuizPage