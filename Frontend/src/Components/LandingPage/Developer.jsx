import "../../Styles/Components/LandingPage/Developer.css"

const Developer = ({ imageOfThem, name, description, LinkedIn, GitHub }) => {
    return (
        <>
            <div className={`developer-container`}>
                <img src={imageOfThem} alt="" />
                <div className="wise-words-from-this-dev">
                    <h1>{name}</h1>
                    <p>{description}</p>
                    <div className="dev-links">
                        <a href={LinkedIn} target="_blank" rel="noopener noreferrer">&gt;&gt;&gt; LinkedIn &lt;&lt;&lt;</a>
                        <a href={GitHub} target="_blank" rel="noopener noreferrer">&gt;&gt;&gt; GitHub &lt;&lt;&lt;</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Developer