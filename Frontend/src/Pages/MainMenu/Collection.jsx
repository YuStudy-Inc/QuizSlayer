import Podium from "../../Components/Podium"
import lootBox from "../../assets/Collection/lootBox.png"

import "./Collection.css"

const Collection = () => {
    return (
        <>
            <div className="collection_page">
                <div className="collection_page_outer_container">
                    <div className="collection_page_left_container test">
                        <div className="collection-title">
                            <h1>Collection</h1>
                        </div>
                        <Podium className="collection_podium"/>
                    </div>
                    <div className="collection_page_right_container test">
                        <div className="carousels">
                            <h2 className="collection_page_select_category_header">character</h2>
                            <div className="collection_page_select_container">
                                <p className="collection_page_select_arrow">	&#60; </p>
                                <p className="collection_page_select_text">character 1</p>
                                <p className="collection_page_select_arrow right"> &#62; </p>
                            </div>
                        </div>
                        <div className="carousels">
                            <h2 className="collection_page_select_category_header">hat</h2>
                            <div className="collection_page_select_container">
                                <p className="collection_page_select_arrow">	&#60; </p>
                                <p className="collection_page_select_text">hat 1</p>
                                <p className="collection_page_select_arrow right"> &#62; </p>
                            </div>
                        </div>
                        <div className="carousels">
                            <h2 className="collection_page_select_category_header">weapon</h2>
                            <div className="collection_page_select_container">
                                <p className="collection_page_select_arrow">	&#60; </p>
                                <p className="collection_page_select_text">weapon 1</p>
                                <p className="collection_page_select_arrow right"> &#62; </p>
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