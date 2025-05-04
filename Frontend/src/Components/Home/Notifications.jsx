import "../../Styles/Components/Home/Notifications.css"
import { FriendRequest } from "../Components"
import { useEffect, useState } from "react"
import axios from "axios"

const URI = import.meta.env.VITE_APP_URI
const userId = JSON.parse(localStorage.getItem('id'))

const Notifications = () => {
    const [friendRequestList, setFriendRequestList] = useState([])

    useEffect(() => {
        const fetchFriendRequests = async () => {
            console.log("finding requests")
            try {
                const response = await axios.get(`${URI}users/getUsersFriendRequests/${userId}`, {
                    withCredentials: true
                })
                if (response.status === 200) {
                    setFriendRequestList(response.data.friendRequests)
                    console.log(response.data)
                }
            }
            catch (e) {
                console.error("error fetching friend requests", e)
            }
        }
        fetchFriendRequests()
    }, [URI, userId])


    return(
        <>
            <div className="notifications-container">
                {friendRequestList.map((friendRequest, index) => (
                    <FriendRequest key={index} index={index} friendId={friendRequest._id} incomingFriendPfp={FriendRequest.pfp} incomingFriendName={friendRequest.username} friendRequestList={friendRequestList} setFriendRequestList={setFriendRequestList}/>
                ))}
            </div>
        </>
    )
}

export default Notifications