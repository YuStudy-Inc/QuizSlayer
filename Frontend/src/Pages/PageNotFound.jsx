import "../Styles/Pages/PageNotFound.css"
import { sign404 } from "../assets/Pictures.js";

const PageNotFound = () => {
    return(
        <>
            <div className="Page-Not-Found-Container">
                <img src={sign404} alt="" />
                <h1 className="not-found-text">There is no Page Here...</h1>
            </div>
        </>
    )
}

export default PageNotFound