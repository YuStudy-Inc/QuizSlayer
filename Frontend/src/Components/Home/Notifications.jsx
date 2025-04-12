import "../../Styles/Components/Home/Notifications.css"
import { FriendRequest } from "../Components"
import { maomao } from "../../assets/Pictures"

const Notifications = () => {
    return(
        <>
            <div className="notifications-container">
                <FriendRequest incomingFriendPfp={maomao} incomingFriendName="Nick"/>
            </div>
        </>
    )
}

export default Notifications