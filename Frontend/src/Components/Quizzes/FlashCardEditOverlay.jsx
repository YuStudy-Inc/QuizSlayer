import "../../Styles/Components/Quizzes/FlashCardCreationOverlay.css"
import { useState } from "react"
import axios from "axios"

const FlashCardEditOverlay = ({ index, quizId, questionId, questionPrompt, answer, questions, setQuestions, cardsEditedRef, close }) => {
    const prevQuestion = questionPrompt
    const prevAnswer = answer

    const [questionData, setQuestionData] = useState({
        questionPrompt: questionPrompt,
        answer: answer
    })

    const handleCardEdit = () => {
        if (prevQuestion === questionData.questionPrompt && prevAnswer === questionData.answer) return;
        
        const newListOfQuestions = [... questions]
        newListOfQuestions[index] = {
            _id: questionId,
            quizId: quizId,
            questionPrompt: questionData.questionPrompt,
            answer: questionData.answer
        }
        setQuestions(newListOfQuestions)
        cardsEditedRef.current.push({
            _id: questionId,
            quizId: quizId,
            questionPrompt: questionData.questionPrompt,
            answer: questionData.answer
        })
        close()
    }

    const handleQuestionChange = (e) => {
        setQuestionData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <> 
            <div className="overlay-flashcard">
                <div className="back-button-overlay">
                    <button className="nvm" onClick={close}>
                        <h1>&lt;</h1>
                    </button>
                </div>
                <div className="title-overlay">
                    <h1>Editing Flashcard</h1>
                </div>
                <div className="flashcard-itself">
                    <div className="question-flashcard-overlay">
                        <input type="text" name="questionPrompt" value={questionData.questionPrompt} placeholder="Question" onChange={handleQuestionChange}/>
                    </div>
                    <div className="answer-flashcard-overlay">
                        <input type="text" name="answer" value={questionData.answer} placeholder="Answer" onChange={handleQuestionChange}/>
                    </div>
                </div>
                <div className="create-that-flashcard">
                    <button className="create-that-flashcard-button" onClick={handleCardEdit}>
                        <h1>Edit Flashcard</h1>
                    </button>
                </div>
            </div>
        </>
    )
}

export default FlashCardEditOverlay