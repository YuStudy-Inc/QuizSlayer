import "../../Styles/Components/Quizzes/FlashCard.css"
import { pencil, trash } from "../../assets/Pictures"
import { useState } from "react"

const FlashCard = ({ questionInput, answerInput, editing, onEdit, onDelete }) => {
    

    
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
                    <button className="edit-flashcard" onClick={onEdit}>
                        <img src={pencil} alt="" />
                    </button>
                    <button className="delete-flashcard" onClick={onDelete}>
                        <img src={trash} alt="" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default FlashCard