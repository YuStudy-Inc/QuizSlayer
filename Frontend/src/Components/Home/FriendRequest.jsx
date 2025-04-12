import "../../Styles/Components/Home/FriendRequest.css"

const FriendRequest = ({ incomingFriendPfp, incomingFriendName }) => {
    return(
        <>
            <div className="friend-request-container">
                <div className="display">
                    <div className="profilepic">
                        <img src={incomingFriendPfp} alt="" />
                    </div>
                    <div className="name">
                        <p>{incomingFriendName} wants to be your friend!</p>
                    </div>
                </div>
                <div className="options">
                    <button>Accept</button>
                    <button>Reject</button>
                </div>
            </div>
        </>
    )
}

export default FriendRequest