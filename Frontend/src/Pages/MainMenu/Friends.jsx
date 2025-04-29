import "../../Styles/Pages/MainMenu/Friends.css"
import { FriendCard, AddAFriend, Podium } from "../../Components/Components.js"
import { maomao, addUser } from "../../assets/Pictures.js"
import { useEffect, useState } from "react"
import axios from 'axios'

const URI = import.meta.env.VITE_APP_URI
const userId = JSON.parse(localStorage.getItem('id'))
const Friends = () => {
    const [showAddFriend, setShowAddFriend] = useState(false)
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [friends, setFriends] = useState([])
    const letsLookForAFriend = () => {
        setShowAddFriend(true)
    }

    const imLonely = () => {
        setShowAddFriend(false)
    }

    const handleFriendClick = (friend) => {
        setSelectedFriend(friend)
        console.log(friend.xp)
        // Optionally: navigate, show more info, set active friend, etc.
    };
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                // Fetch the list of friends
                const allFriends = await axios.get(`${URI}users/getFriends/${userId}`);
                const friendsWithData = []
                for (const friend of allFriends.data.friends) {

                    const response = await axios.get(`${URI}users/getFriendData/${friend}`);
                    friendsWithData.push(response.data);
                }
                setFriends(friendsWithData);

            } catch (e) {
                console.log("Error fetching friends:", e);
            }
        };
        fetchFriends();
    }, [userId]);  // Run effect when userId changes
    return (
        <>
            <div className="friends-container">
                <div className="amigos">
                    <div className="left-side-amigos">
                        <div className="title-for-friends">
                            <h1>Friends</h1>
                        </div>
                        <div className="right-side-amigos-for-mobile">
                            <div className="podium-plus-info-for-mobile">
                                <div className="podium-centerer-friends">
                                    <Podium />
                                </div>
                                <div className="info">
                                    {selectedFriend ? (
                                        <>
                                            <h1>{selectedFriend.username || "No Name Available"}</h1>
                                            <p>Description: {selectedFriend.description || "No description available."}</p>
                                            <p>Level: {selectedFriend.level || "Unknown"}</p>
                                            {/* You can add more fields here with fallback texts */}
                                        </>
                                    ) : (
                                        <p>Please select a friend to see their details.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="scroll-for-more-friends">

                            {friends.length > 0 && friends.map((friend, index) => (
                                <FriendCard
                                    key={index}
                                    friendPfp={friend.pfp || maomao}
                                    friendName={friend.username}
                                    friendLevel={friend.xp || "1"}
                                    onClick={() => handleFriendClick(friend)}
                                />
                            ))}

                        </div>
                    </div>
                    <div className="right-side-amigos">
                        <div className="podium-plus-info">
                            <div className="podium-centerer-friends">
                                <Podium />
                            </div>
                            <div className={`info ${selectedFriend ? "" : "not-selected-info"}`}>
                                {selectedFriend ? (
                                    <>
                                        <h1>{selectedFriend.username || "No Name Available"}</h1>
                                        <p>Description:</p>
                                        <p>Level: {selectedFriend.xp}</p>
                                        {/* You can add more fields here with fallback texts */}
                                    </>
                                ) : (
                                    <p>Please select a friend to see their details...</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="add-a-friend">
                        <button className="add-a-friend-button" onClick={letsLookForAFriend}>
                            <img src={addUser} alt="" />
                        </button>
                    </div>
                </div>
                {showAddFriend && (<AddAFriend close={imLonely} />)}
            </div>
        </>
    )
}

export default Friends