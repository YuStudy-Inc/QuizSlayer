import "../../Styles/Components/Home/Notifications.css"
import { FriendRequest } from "../Components"
import { maomao } from "../../assets/Pictures"
import { useEffect, useState } from "react"
import axios from "axios"

const URI = import.meta.env.VITE_APP_URI
const userId = JSON.parse(localStorage.getItem('id'))

const Notifications = () => {
    const [friendRequests, setFriendRequests] = useState([])

    useEffect(() => {
        const getFriendRequests = async () => {
            try {
                const response = await axios.get(`${URI}users/getFriendRequests/${userId}`)
                if (response.status === 200)
                    setFriendRequests(response.data)
            }
            catch (e) {
                console.error("Error fetching user's friend requests", e)
            }
        }
        getFriendRequests()
    }, [URI, userId])

    return(
        <>
            <div className="notifications-container">
                {friendRequests.map((friendRequest, index) => (
                    <FriendRequest key={index} incomingFriendPfp={maomao} incomingFriendName={friendRequest.username} />
                ))}
            </div>
        </>
    )
}

export default Notifications