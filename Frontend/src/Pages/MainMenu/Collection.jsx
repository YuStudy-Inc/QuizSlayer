import Podium from "../../Components/Podium"
import lootBox from "../../assets/Collection/lootbox.png"

import "../../Styles/Pages/Collection.css"

const Collection = () => {
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
                                <p className="collection-page-select-text">character 1</p>
                                <p className="collection-page-select-arrow right"> &#62; </p>
                            </div>
                        </div>
                        <div className="carousels">
                            <h2 className="collection-page-select-category-header">hat</h2>
                            <div className="collection-page-select-container">
                                <p className="collection-page-select-arrow">	&#60; </p>
                                <p className="collection-page-select-text">hat 1</p>
                                <p className="collection-page-select-arrow right"> &#62; </p>
                            </div>
                        </div>
                        <div className="carousels">
                            <h2 className="collection-page-select-category-header">weapon</h2>
                            <div className="collection-page-select-container">
                                <p className="collection-page-select-arrow">	&#60; </p>
                                <p className="collection-page-select-text">weapon 1</p>
                                <p className="collection-page-select-arrow right"> &#62; </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="gatcha">
                    <button className="gatcha-button">
                        <img src={lootBox} alt="" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Collection;