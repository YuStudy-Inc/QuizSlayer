import "../../Styles/Components/Home/FriendRequest.css"
import axios from "axios"

const URI = import.meta.env.VITE_APP_URI
const userId = JSON.parse(localStorage.getItem('id'))

const FriendRequest = ({ index, friendId, incomingFriendPfp, incomingFriendName, friendRequestList, setFriendRequestList }) => {
    const accept = async () => {
        console.log(friendId)
        try {
            const response = await axios.put(`${URI}users/acceptFriendRequest/${userId}`, {
                friendId: friendId
            }, {
                withCredentials: true
            })
            if (response.status === 200) {
                const newFriendRequestList = friendRequestList.indexOf(index)
                setFriendRequestList(newFriendRequestList)
            }
                
        }
        catch (e) {
            console.error("error accepting ts friend", e)
        }
    }

    const reject = async () => {
        console.log(friendId)
        try {
            const response = await axios.put(`${URI}users/rejectFriendRequest/${userId}`, {
                friendId: friendId
            }, {
                withCredentials: true
            })
            if (response.status === 200) {
                const newFriendRequestList = friendRequestList.indexOf(index)
                setFriendRequestList(newFriendRequestList)
            }
        }
        catch (e) {
            console.error("error rejecting ts friend", e)
        }
    }

    return(
        <>
            <div className="friend-request-container">
                <div className="display">
                    <div className="profile-pic-request">
                        <img src={incomingFriendPfp} alt="" />
                    </div>
                    <div className="name">
                        <p><span>{incomingFriendName}</span> wants to be your friend!</p>
                    </div>
                </div>
                <div className="options">
                    <button className="yes-button" onClick={accept}>Accept</button>
                    <button className="no-button" onClick={reject}>Reject</button>
                </div>
            </div>
        </>
    )
}

export default FriendRequest