import "../../Styles/Components/LandingPage/SpecialThanksCards.css"

const SpecialThanksCards = ({ image, name, role, linkForSocial }) => {
    return (
        <>
            <div className="special-thanks-card-container">
                <img src={image} alt="" />
                <h1>{name}</h1>
                <p>{role}</p>
                <a href={linkForSocial} target="_blank" rel="noopener noreferrer">&gt;&gt;&gt; Socials &lt;&lt;&lt;</a>
            </div>
        </>
    )
}

export default SpecialThanksCards