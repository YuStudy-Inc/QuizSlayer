import "../../Styles/Pages/Friends.css"
import FriendCard from "../../Components/Components.js"

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
                            {}
                        </div>
                    </div>
                    <div className="right-side-amigos">

                    </div>
                </div>
            </div>
        </>
    )
}

export default Friends