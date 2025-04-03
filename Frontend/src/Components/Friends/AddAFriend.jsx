import "../../Styles/Components/Friends/AddAFriend.css"
import plus from "../../assets/Quizzes/plus.png"

const AddAFriend = ({ close }) => {

    const handleClose = () => {
        close()
    }

    const getThatFriend = () => {
       /*  backendStuff */
       close()
    }


    return(
        <>
            <div className="find-a-friend-overlay">
                <div className="back-button-overlay">
                    <button className="nvm" onClick={handleClose}>
                        <h1>&lt;</h1>
                    </button>
                </div>
                <div className="find-a-friend-container">
                    <div className="find-a-friend-title">
                        <h1>Find Friend by Username</h1>
                    </div>
                    <div className="type-in-username">
                        <input type="text" />
                        <button onClick={getThatFriend}>
                            <img src={plus} alt="" />
                        </button> 
                    </div>
                    {/* need to add error messages in case the username doesn't exist or there is nothing in the input */}
                </div>
            </div>
        </>
    )
}

export default AddAFriend