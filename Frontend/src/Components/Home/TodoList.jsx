import "../Styles/Components/TodoList.css"
import { useState } from "react"

const TodoList = ({ className = "", quizzesToDo }) => {
    const [showSpreadOut, setShowSpreadOut] = useState(false)

    const toggleSpreadOut = () => {
        setShowSpreadOut(!showSpreadOut)
    }

    return (
        <>
            <div className={`todolist-container ${className}`}>
                <h1>Todo</h1>
                {/* add the list of quizzes todo from the db */}
                <div className="info-on-the-normal none">
                        <p>No Quizzes to do!</p>
                    </div>
            </div>

            <div className="small-todolist-container">
                <button className="toggle-spread" onClick={() => toggleSpreadOut()}>
                    <h1>Todo</h1>
                </button>
            </div>
            <div className={`spread-out-container ${showSpreadOut ? "shown" : ""}`} onClick={() => toggleSpreadOut()}>
                <div className="spread-out">
                    <h1>Todo</h1>
                    {/* if no friends, add the none className */}
                    <div className="info-on-the-spread-out none">
                        <p>No Quizzes to do!</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoList