import "../../Styles/Pages/MainMenu/CreateQuizPage.css"
import { plus } from "../../assets/Pictures.js";
import { FlashCard, FlashCardCreationOverlay, FlashCardEditOverlay } from "../../Components/Components.js";
import { useEffect, useState, useRef } from 'react';
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

    const cardsEditedRef = useRef([])
    const cardsDeletedRef = useRef([])
    const cardsAddedRef = useRef([])


    useEffect(() => {
        if (!quizId) {
            console.log("no id")
            return
        } 

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
        if (!quizId) {
            console.log("no id")
            return
        } 

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
    //index, quizId, question._id, question.questionPrompt, question.answer, questions, setQuestions, cardsEdited
    const handleEditCardOverlay = (index, quizId, questionId, questionPrompt, answer) => {
        setCardBeingEdited({index, quizId, questionId, questionPrompt, answer})
    }

    const handleEditCardClose = () => {
        setCardBeingEdited(null)
    }

    const handleCardDeletion = (questionId) => {
        cardsDeletedRef.current.push(questionId)
        const newListOfQuestions = questions.filter(question => question._id !== questionId)
        setQuestions(newListOfQuestions)
    }

    const handleQuizSaveChanges = async () => {
        const cardsEdited = cardsEditedRef.current;
        const cardsDeleted = cardsDeletedRef.current;
        const cardsAdded = cardsAddedRef.current;

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

            if (Array.isArray(cardsEdited) && cardsEdited.length > 0) {
                const editedQuestionsResponse = await axios.put(`${URI}questions/editQuestions`, {
                    questions: cardsEdited
                },
                {
                    withCredentials: true
                })
                if (editedQuestionsResponse.status === 200) {
                    console.log("successfully added edited questions to Quiz")
                }
            }
            if (Array.isArray(cardsDeleted) && cardsDeleted.length > 0) {
                const deletedQuestionsResponse = await axios.delete(`${URI}questions/deleteQuestions`, {
                    data: { questions: cardsDeleted },
                    withCredentials: true
                })
                if (deletedQuestionsResponse.status === 200) {
                    console.log("successfully added edited questions to Quiz")
                }
            }
            if (Array.isArray(cardsAdded) && cardsAdded.length > 0) {
                const createdQuestionsResponse = await axios.post(`${URI}questions/createQuestions`, {
                    questions: updatedQuestionsWithNewId
                },
                {
                    withCredentials: true
                })
                if (createdQuestionsResponse.status === 200) {
                    console.log("successfully added edited questions to Quiz")
                }
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
                                        <FlashCard key={index} questionInput={question.questionPrompt} answerInput={question.answer} editing={true} onEdit={() => {handleEditCardOverlay(index, quizId, question._id, question.questionPrompt, question.answer)}} onDelete={() => {handleCardDeletion(question._id)}}/>
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
                    <FlashCardCreationOverlay makeNewCard={setQuestions} areYouEditing={true} createdCardsList={cardsAddedRef} close={handleCardCreationClose}/>
                )}
               {/*  index, quizId, questionId, questionPrompt, answer, questions, setQuestions, cardsEdited, close  */}
                {cardBeingEdited && (<FlashCardEditOverlay index={cardBeingEdited.index} quizId={cardBeingEdited.quizId} questionId={cardBeingEdited.questionId} questionPrompt={cardBeingEdited.questionPrompt} answer={cardBeingEdited.answer} questions={questions} setQuestions={setQuestions} cardsEditedRef={cardsEditedRef} close={handleEditCardClose}/>)}
            </div>
        </>
    )
}
export default EditQuizPage