import "../../Styles/Components/Home/FriendsActive.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { FriendCard } from "../Components"

const URI = import.meta.env.VITE_APP_URI
const userId = JSON.parse(localStorage.getItem('id'))

const FriendsActive = ({ className= "" }) => {
    const [showSpreadOut, setShowSpreadOut] = useState(false)
    const [friends, setFriends] = useState([])

    const toggleSpreadOut = () => {
        setShowSpreadOut(!showSpreadOut)
    }

    useEffect(() => {
        const fetchActiveFriends = async () => {
            try {
                const allActiveFriends = await axios.get(`${URI}users/getUsersActiveFriends/${userId}`, {
                    withCredentials: true
                })
                setFriends(allActiveFriends.data.friends)
            }
            catch (e) {
                console.error("error fetching active friends", e)
            }
        }
        fetchActiveFriends()
    }, [URI, userId])


    return (
        <>
            <div className={`friends-active-container ${className}`}>
                <h1>Active</h1>
                {friends.length !== 0 ? (
                    <div className="info-on-the-normal">
                       {friends.map((friend, index) => (
                            <FriendCard key={index} friendPfp={friend.pfp} friendName={friend.username} isOnHome={true} />
                       ))}
                    </div>
                ): (
                    <div className="info-on-the-normal none">
                        <p>No Friends Active...</p>
                    </div>
                )}
                
            </div>

            <div className="small-friends-active-container">
                <button className="toggle-spread" onClick={() => toggleSpreadOut()}>
                    <h1>Active</h1>
                </button>
            </div>
            <div className={`spread-out-container ${showSpreadOut ? "shown" : ""}`} onClick={() => toggleSpreadOut()}>
                <div className="spread-out">
                    <h1>Active</h1>
                    
                    {friends.length !== 0 ? (
                        <div className="info-on-the-spread-out">
                            {friends.map((friend, index) => (
                                <FriendCard key={index} friendPfp={friend.pfp} friendName={friend.username} />
                            ))}
                        </div>
                    ) : (
                        <div className="info-on-the-spread-out none">
                            <p>No Friends Active...</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default FriendsActive