import "../../Styles/Components/Friends/FriendCard.css"

const FriendCard = ({ friendPfp, friendName, onClick, isOnHome=false }) => {
    return (
        <>
            <div className="one-friend" onClick={onClick}>
                <div className="profilepic">
                    <img src={friendPfp} alt="" />
                </div>
                <div className={`name ${isOnHome ? "black-writing" : ""}`}>
                    <h1>{friendName}</h1>
                </div>
            </div>
        </>
    );
}

export default FriendCard