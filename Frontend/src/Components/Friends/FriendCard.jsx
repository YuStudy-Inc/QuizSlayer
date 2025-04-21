import "../../Styles/Components/Friends/FriendCard.css"

const FriendCard = ({ friendPfp, friendName  }) => {
    return (
        <>
            <div className="one-friend">
                <div className="profilepic">
                    <img src={friendPfp} alt="" />
                </div>
                <div className="name">
                    <h1>{friendName}</h1>
                </div>
                
            </div>
        </>
    )
}

export default FriendCard