import "../Styles/Components/TodoList.css"

const TodoList = ({ className = "", quizzesToDo }) => {
    return (
        <>
            <div className={`todolist-container ${className}`}>
                <h1>Todo</h1>
                {/* add the list of quizzes todo from the db */}
            </div>
        </>
    )
}

export default TodoList