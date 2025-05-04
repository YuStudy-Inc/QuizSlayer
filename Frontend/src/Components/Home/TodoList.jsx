import "../../Styles/Components/Home/TodoList.css"
import { useState, useEffect } from "react"
import axios from "axios"

const URI = import.meta.env.VITE_APP_URI
const userId = JSON.parse(localStorage.getItem('id'))

const TodoList = ({ className = "" }) => {
    const [showSpreadOut, setShowSpreadOut] = useState(false)
    const [quizzesToDo, setQuizzesToDo] = useState([])

    const toggleSpreadOut = () => {
        setShowSpreadOut(!showSpreadOut)
    }

    useEffect(() => {
        const fetchToDoQuizzes = async () => {
            try {
                const allToDoQuizzes = await axios.get(`${URI}quizzes/getToDoQuizzes/${userId}`, {
                    withCredentials: true
                })
                setQuizzesToDo(allToDoQuizzes.data.quizzesStillLeftToDo)
            }
            catch (e) {
                console.log(e)
            }
        }
        fetchToDoQuizzes()
    }, [URI, userId])

    return (
        <>
            <div className={`todolist-container ${className}`}>
                <h1>Todo</h1>
                {quizzesToDo.length !== 0 ? (
                    <div className="info-on-the-normal">
                        {quizzesToDo.map((quiz, index) => (
                            <p key={index}>{quiz.title}</p>
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
                        {quizzesToDo.length !== 0 ? (
                        <div className="info-on-the-normal">
                            {quizzesToDo.map((quiz, index) => (
                                <p key={index}>{quiz.title}</p>
                            ))}
                        </div>
                    ) : (
                        <div className="info-on-the-spread-out none">
                            <p>No Quizzes to do!</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default TodoList