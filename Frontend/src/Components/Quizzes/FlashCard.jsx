import "../../Styles/Components/Quizzes/FlashCard.css"

const FlashCard = ({ questionInput, answerInput }) => {
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
            </div>
        </>
    )
}

export default FlashCard