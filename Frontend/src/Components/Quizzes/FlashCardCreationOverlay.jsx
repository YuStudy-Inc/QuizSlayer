import "../../Styles/Components/Quizzes/FlashCardCreationOverlay.css"
import { useState } from "react"


const FlashCardCreationOverlay = ({ makeNewCard, areYouEditing = false, createdCardsList = null, close }) => {
    const [newQuestion, setNewQuestion] = useState("")
    const [newAnswer, setNewAnswer] = useState("")
    
    const handleCardCreation =() => {
        if (!newQuestion || !newAnswer) {
            return;
        }


        makeNewCard((prevCard) => [... prevCard, {
            questionPrompt: newQuestion,
            answer: newAnswer
        }])

        if (areYouEditing) {
            createdCardsList.current.push({
                questionPrompt: newQuestion,
                answer: newAnswer
            })
        }
        close()
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
                    <h1>New Flashcard</h1>
                </div>
                <div className="flashcard-itself">
                    <div className="question-flashcard-overlay">
                        <input type="text" placeholder="Question" value={newQuestion} onChange={(e) => {setNewQuestion(e.target.value)}}/>
                    </div>
                    <div className="answer-flashcard-overlay">
                        <input type="text" placeholder="Answer" value={newAnswer} onChange={(e) => {setNewAnswer(e.target.value)}}/>
                    </div>
                </div>
                <div className="create-that-flashcard">
                    <button className="create-that-flashcard-button" onClick={handleCardCreation}>
                        <h1>Create Flashcard</h1>
                    </button>
                </div>
            </div>
        </>
    )
}

export default FlashCardCreationOverlay