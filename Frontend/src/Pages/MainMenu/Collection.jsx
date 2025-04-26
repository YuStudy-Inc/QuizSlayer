import { Podium } from "../../Components/Components.js"
import { duckCharacter, bucketHat, playfulCloud, lootBox } from "../../assets/Pictures.js"
import "../../Styles/Pages/MainMenu/Collection.css"
import { useNavigate } from "react-router-dom"

const Collection = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className="collection-page">
                <div className="collection-page-outer-container">
                    <div className="collection-page-left-container test">
                        <div className="collection-title">
                            <h1>Collection</h1>
                        </div>
                        <div className="podium-centerer-collection">
                            <Podium className="collection-podium"/>
                        </div>
                    </div>
                    <div className="collection-page-right-container test">
                        <div className="carousels">
                            <h2 className="collection-page-select-category-header">character</h2>
                            <div className="collection-page-select-container">
                                <p className="collection-page-select-arrow">	&#60; </p>
                                <img className="character-image" src={duckCharacter} alt="" />
                                <p className="collection-page-select-arrow right"> &#62; </p>
                            </div>
                        </div>
                        <div className="carousels">
                            <h2 className="collection-page-select-category-header">hat</h2>
                            <div className="collection-page-select-container">
                                <p className="collection-page-select-arrow">	&#60; </p>
                                <img className="hat-image" src={bucketHat} alt="" />
                                <p className="collection-page-select-arrow right"> &#62; </p>
                            </div>
                        </div>
                        <div className="carousels">
                            <h2 className="collection-page-select-category-header">weapon</h2>
                            <div className="collection-page-select-container">
                                <p className="collection-page-select-arrow">	&#60; </p>
                                <img className="weapon-image" src={playfulCloud} alt="" />
                                <p className="collection-page-select-arrow right"> &#62; </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="gacha">
                    <button className="gacha-button" onClick={() => {navigate('/gacha')}}>
                        <img src={lootBox} alt="" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Collection;