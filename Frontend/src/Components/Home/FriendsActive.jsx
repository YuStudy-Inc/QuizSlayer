import "../../Styles/Components/Home/FriendsActive.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { FriendCard } from "../Components"
import { maomao } from "../../assets/Pictures"


const FriendsActive = ({ className= "", }) => {
    const URI = import.meta.env.VITE_URI
    const [showSpreadOut, setShowSpreadOut] = useState(false)
    const [friends, setFriends] = useState([])

    const toggleSpreadOut = () => {
        setShowSpreadOut(!showSpreadOut)
    }

    useEffect(() => {
        const fetchActiveFriends = async () => {
            try {
                const allActiveFriends = await axios.get(`${URI}/users/getUsersFriends`)
                setFriends(allActiveFriends.data)
            }
            catch (e) {
                console.log(e)
            }
        }
        fetchActiveFriends()
    }, [])


    return (
        <>
            <div className={`friends-active-container ${className}`}>
                <h1>Active</h1>
                {friends.length !== 0 ? (
                    <div className="info-on-the-normal">
                       {friends.map((friend) => (
                            <FriendCard friendPfp={friend.pfp} friendName={friend.username} />
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
                    {/* if no friends, add the none className */}
                    <div className="info-on-the-spread-out none">
                        <p>No Friends Active...</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FriendsActive