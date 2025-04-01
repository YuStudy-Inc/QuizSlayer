import "../../Styles/Pages/Friends.css"
import { FriendCard, AddAFriend, Podium } from "../../Components/Components.js"
import maomao from "../../assets/Friends/maomao.jpg"
import addUser from "../../assets/Friends/add-user.png"
import { useState } from "react"

const Friends = () => {
    const [showAddFriend, setShowAddFriend] = useState(false)

    const letsLookForAFriend = () => {
        setShowAddFriend(true)
    }

    const imLonely = () => {
        setShowAddFriend(false)
    }


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
                                    <h1>Nick{/* {getUsernameOfActiveFriend} */}</h1>
                                    <p>Description :{/*  {getDescriptionOfActiveFriend} */}</p>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="scroll-for-more-friends">
                            <FriendCard friendPfp={maomao} friendName="nick" friendLevel="10" />
                            <FriendCard friendPfp={maomao} friendName="nick" friendLevel="10" />
                            <FriendCard friendPfp={maomao} friendName="nick" friendLevel="10" />
                            <FriendCard friendPfp={maomao} friendName="nick" friendLevel="10" />
                            <FriendCard friendPfp={maomao} friendName="nick" friendLevel="10" />
                            <FriendCard friendPfp={maomao} friendName="nick" friendLevel="10" />
                            <FriendCard friendPfp={maomao} friendName="nick" friendLevel="10" />
                            <FriendCard friendPfp={maomao} friendName="nick" friendLevel="10" />
                            <FriendCard friendPfp={maomao} friendName="nick" friendLevel="10" />
                            <FriendCard friendPfp={maomao} friendName="nick" friendLevel="10" />
                        </div>
                    </div>
                    <div className="right-side-amigos">
                        <div className="podium-plus-info">
                            <div className="podium-centerer-friends">
                                <Podium />
                            </div>
                            <div className="info">
                                <h1>Nick{/* {getUsernameOfActiveFriend} */}</h1>
                                <p>Description :{/*  {getDescriptionOfActiveFriend} */}</p>
                                
                            </div>
                        </div>
                    </div>
                    <div className="add-a-friend">
                        <button className="add-a-friend-button" onClick={letsLookForAFriend}>
                            <img src={addUser} alt="" />
                        </button>
                    </div>
                </div>
                {showAddFriend && (<AddAFriend close={imLonely}/>)}
            </div>
        </>
    )
}

export default Friends