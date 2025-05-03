import "../../Styles/Components/Friends/AddAFriend.css"
import { useState } from "react"
import { plus } from "../../assets/Pictures"
import Alert from "../Alert"
import axios from "axios"

const URI = import.meta.env.VITE_APP_URI
const userId = JSON.parse(localStorage.getItem('id'))

const AddAFriend = ({ close }) => {
    const [friendRequestError, setFriendRequestError] = useState(false)
    const [friendBeingAdded, setFriendBeingAdded] = useState("")
    const [friendRequestAlert, setFriendRequestAlert] = useState(false)
    const [friendMessageAlert, setFriendMessageAlert] = useState("")

    const closeEverything = () => {
        setFriendMessageAlert("")
        setFriendRequestAlert(false)
        close()
    }

    const handleChange = (e) => {
        setFriendBeingAdded(e.target.value)
    }

    const getThatFriend = async () => {
        console.log(friendBeingAdded)
        if (friendBeingAdded === "") {
            setFriendRequestError(true)
            return
        }

        try {
            const response = await axios.post(`${URI}users/sendFriendRequest/${userId}`, {
                username: friendBeingAdded
            }, {
                withCredentials: true
            })
            if (response.status === 200) {
                setFriendMessageAlert("Friend Request Sent!")
                setFriendRequestAlert(true)
                console.log("friend Request sent")
            }
            else if (response.status === 400) {
                setFriendMessageAlert(response.error)
                setFriendRequestAlert(true)
                console.log(response.error)
            }
        }
        catch (e) {
            console.error("error sending friend Request", e)
        }
    }


    return(
        <>
            <div className="find-a-friend-overlay">
                <div className="back-button-overlay">
                    <button className="nvm" onClick={closeEverything}>
                        <h1>&lt;</h1>
                    </button>
                </div>
                {friendRequestAlert && (<Alert text={friendMessageAlert} buttonOneText="Ok" functionButtonOne={closeEverything}/>)}
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
                    {friendRequestError && (<h1 className="error-friend">Please enter a name</h1>)}
                </div>
            </div>
        </>
    )
}

export default AddAFriend