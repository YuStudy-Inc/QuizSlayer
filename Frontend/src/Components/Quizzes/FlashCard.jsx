import "../../Styles/Components/Quizzes/FlashCard.css"
import { pencil } from "../../assets/Pictures"
import { useState } from "react"

const FlashCard = ({ key, id, questionInput, answerInput, editing, onEdit }) => {
    

    
    return (
        <>
            <div className="flashcard-container">
                <div className="question">
                    <p>{questionInput}</p>
                </div>
                <div className="divider"></div>
                <div className="answer">
                    <p>{answerInput}</p>
                </div>
                <div className={`edit-button-on-the-flashcard ${editing ? "editing" : ""}`}>
                    <button onClick={onEdit}>
                        <img src={pencil} alt="" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default FlashCard