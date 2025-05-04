import "../../Styles/Pages/MainMenu/Friends.css"
import { FriendCard, AddAFriend, FriendPodium } from "../../Components/Components.js"
import { maomao, addUser } from "../../assets/Pictures.js"
import { useEffect, useState } from "react"
import axios from 'axios'

const URI = import.meta.env.VITE_APP_URI
const userId = JSON.parse(localStorage.getItem('id'))

const Friends = () => {
    const [showAddFriend, setShowAddFriend] = useState(false)
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [friends, setFriends] = useState([])

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axios.get(`${URI}users/getFriends/${userId}`);
                if (response.status === 200)
                    setFriends(response.data.friends)
                
            } catch (e) {
                console.log("Error fetching friends:", e);
            }
        };
        fetchFriends();
    }, [URI, userId]);

    const letsLookForAFriend = () => {
        setShowAddFriend(true)
    }

    const imLonely = () => {
        setShowAddFriend(false)
    }

    const handleFriendClick = (friend) => {
        console.log(friend)
        setSelectedFriend(friend)
    };

    return (
        <>
            {showAddFriend && (<AddAFriend close={imLonely} />)}
            <div className="friends-container">
                <div className="amigos">
                    <div className="left-side-amigos">
                        <div className="title-for-friends">
                            <h1>Friends</h1>
                        </div>
                        <div className="right-side-amigos-for-mobile">
                            <div className="podium-plus-info-for-mobile">
                                <div className="podium-centerer-friends">
                                    <FriendPodium character={selectedFriend ? selectedFriend.selectedCharacter : 0} hat={selectedFriend ? selectedFriend.selectedHat : 0} weapon={selectedFriend ? selectedFriend.selectedWeapon : 0} />
                                </div>
                                <div className="info">
                                    {selectedFriend ? (
                                        <>
                                            <h1>{selectedFriend.username || "No Name Available"}</h1>
                                            <p>Description: {selectedFriend.description || "No description available."}</p>
                                            <p>Monsters slain: {selectedFriend.monstersSlain || "0"}</p>
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
                                    friendPfp={friend.pfp}
                                    friendName={friend.username}
                                    onClick={() => handleFriendClick(friend)}
                                />
                            ))}

                        </div>
                    </div>
                    <div className="right-side-amigos">
                        <div className="podium-plus-info">
                            <div className="podium-centerer-friends">
                            <FriendPodium character={selectedFriend ? selectedFriend.selectedCharacter : 0} hat={selectedFriend ? selectedFriend.selectedHat : 0} weapon={selectedFriend ? selectedFriend.selectedWeapon : 0} />
                            </div>
                            <div className={`info ${selectedFriend ? "" : "not-selected-info"}`}>
                                {selectedFriend ? (
                                    <>
                                        <h1>{selectedFriend.username || "No Name Available"}</h1>
                                        <p>Description: {selectedFriend.description || "No Description"}</p>
                                        <p>Monsters Slain: {selectedFriend.monstersSlain || 0}</p>
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
            </div>
        </>
    )
}

export default Friends