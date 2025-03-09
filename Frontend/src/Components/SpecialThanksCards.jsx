import "../Styles/Components/SpecialThanksCards.css"

const SpecialThanksCards = ({ image, name, role }) => {
    return (
        <>
            <div className="special-thanks-card-container">
                <img src={image} alt="" />
                <h1>{name}</h1>
                <p>{role}</p>
            </div>
        </>
    )
}

export default SpecialThanksCards