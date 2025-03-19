import "../../Styles/Pages/Friends.css"
import FriendCard from "../../Components/FriendCard"
import maomao from "../../assets/Friends/maomao.jpg"
import Podium from "../../Components/Podium.jsx"
import addUser from "../../assets/Friends/add-user.png"

const Friends = () => {
    return (
        <>
            <div className="friends-container">
                <div className="amigos">
                    <div className="left-side-amigos">
                        <div className="title-for-friends">
                            <h1>Friends</h1>
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
                            <div className="podi">
                                <Podium />
                            </div>
                            <div className="info">
                                <h1>Nick{/* {getUsernameOfActiveFriend} */}</h1>
                                <p>Description :{/*  {getDescriptionOfActiveFriend} */}</p>
                                
                            </div>
                        </div>
                    </div>
                    <div className="add-a-friend">
                        <button className="add-a-friend-button">
                            <img src={addUser} alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Friends