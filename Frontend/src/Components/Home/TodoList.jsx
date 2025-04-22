import "../../Styles/Components/Home/TodoList.css"
import { useState, useEffect } from "react"
import axios from "axios"

const TodoList = ({ className = "" }) => {
    const URI = import.meta.env.VITE_URI
    const [showSpreadOut, setShowSpreadOut] = useState(false)
    const [quizzesToDo, setQuizzesToDo] = useState([])

    const toggleSpreadOut = () => {
        setShowSpreadOut(!showSpreadOut)
    }

    useEffect(() => {
        const fetchToDoQuizzes = async () => {
            try {
                const allToDoQuizzes = await axios.get(`${URI}/users/getUsersToDoQuizzes`)
                setQuizzesToDo(allToDoQuizzes.data)
            }
            catch (e) {
                console.log(e)
            }
        }
        fetchToDoQuizzes()
    }, [])

    return (
        <>
            <div className={`todolist-container ${className}`}>
                <h1>Todo</h1>
                {quizzesToDo.length !== 0 ? (
                    <div className="info-on-the-normal">
                        {quizzesToDo.map((quiz) => (
                            <h1>{quiz.title}</h1>
                        ))}
                    </div>
                ) : (
                    <div className="info-on-the-normal none">
                        <p>No Quizzes to do!</p>
                    </div>
                )}
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