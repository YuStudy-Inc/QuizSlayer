import "../../Styles/Components/Home/FriendRequest.css"

const FriendRequest = ({ incomingFriendPfp, incomingFriendName }) => {
    return(
        <>
            <div className="friend-request-container">
                <div className="display">
                    <div className="profile-pic-request">
                        <img src={incomingFriendPfp} alt="" />
                    </div>
                    <div className="name">
                        <p><span>{incomingFriendName}</span> wants to be your friend!</p>
                    </div>
                </div>
                <div className="options">
                    <button className="yes-button">Accept</button>
                    <button className="no-button">Reject</button>
                </div>
            </div>
        </>
    )
}

export default FriendRequest