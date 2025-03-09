import "../Styles/Components/Developer.css"

const Developer = ({ imageOfThem, name, description }) => {
    return (
        <>
            <div className="developer-container">
                <img src={imageOfThem} alt="" />
                <div className="wise-words-from-this-dev">
                    <h1>{name}</h1>
                    <p>{description}</p>
                </div>
            </div>
        </>
    )
}

export default Developer