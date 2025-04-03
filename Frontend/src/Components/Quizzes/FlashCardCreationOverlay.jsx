import "../../Styles/Components/Quizzes/FlashCardCreationOverlay.css"

const FlashCardCreationOverlay = ({ close }) => {
    const handleCardCreation =() => {
        /* backend stuff */
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
                        <input type="text" placeholder="Question"/>
                    </div>
                    <div className="answer-flashcard-overlay">
                        <input type="text" placeholder="Answer"/>
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