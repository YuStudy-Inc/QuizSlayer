import "../../Styles/Components/Friends/AddAFriend.css"
import { useState } from "react"
import { plus } from "../../assets/Pictures"
import axios from "axios"

const URI = import.meta.env.VITE_APP_URI
const userId = JSON.parse(localStorage.getItem('id'))

const AddAFriend = ({ close }) => {
    const [friendRequestStatus, setFriendRequestStatus] = useState(false)
    const [messageForStatus, setMessageForStatus] = useState(false)
    const [friendFound, setFriendFound] = useState(false)
    const [friendBeingAdded, setFriendBeingAdded] = useState("")

    const handleChange = (e) => {
        setFriendBeingAdded(e.target.value)
    }

    const getThatFriend = async () => {
        console.log(friendBeingAdded)
        if (friendBeingAdded === "") {
            setMessageForStatus("Please enter a username")
            setFriendFound(false)
            setFriendRequestStatus(true)
            return
        }

        try {
            const response = await axios.post(`${URI}users/sendFriendRequest/${userId}`, {
                username: friendBeingAdded
            }, {
                withCredentials: true
            })
            if (response.status === 200) {
                setMessageForStatus("Friend Request Sent")
                setFriendFound(true)
                setFriendRequestStatus(true)
            }
        }
        catch (e) {
            const errorMessage = e?.response?.data?.error || "Something went wrong"
            setMessageForStatus("User not Found")
            setFriendFound(false)
            setFriendRequestStatus(true)
            console.error("error sending friend Request", errorMessage)
        }
    }

    return(
        <>
            <div className="find-a-friend-overlay">
                <div className="back-button-overlay">
                    <button className="nvm" onClick={close}>
                        <h1>&lt;</h1>
                    </button>
                </div>
                <div className="find-a-friend-container">
                    <div className="find-a-friend-title">
                        <h1>Find Friend by Username</h1>
                    </div>
                    <div className="type-in-username">
                        <input type="text" value={friendBeingAdded} onChange={handleChange} />
                        <button onClick={getThatFriend}>
                            <img src={plus} alt="" />
                        </button> 
                    </div>
                    {friendRequestStatus && (<h1 className={`${friendFound ? "yay-friend" : "error-friend"}`}>{messageForStatus}</h1>)}
                </div>
            </div>
        </>
    )
}

export default AddAFriend