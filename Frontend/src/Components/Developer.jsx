import { Link } from "react-router-dom"
import "../Styles/Components/Developer.css"

const Developer = ({ imageOfThem, name, description, LinkedIn, GitHub, active }) => {
    return (
        <>
            <div className={`developer-container ${active ? "is-active" : ""}`}>
                <img src={imageOfThem} alt="" />
                <div className="wise-words-from-this-dev">
                    <h1>{name}</h1>
                    <p>{description}</p>
                    <div className="dev-links">
                        <a href={LinkedIn}>&gt;&gt;&gt; LinkedIn &lt;&lt;&lt;</a>
                        <a href={GitHub}>&gt;&gt;&gt; GitHub &lt;&lt;&lt;</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Developer