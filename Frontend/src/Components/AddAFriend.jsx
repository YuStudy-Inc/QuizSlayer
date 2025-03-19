import "../Styles/Components/AddAFriend.css"
import plus from "../assets/Quizzes/plus.png"

const AddAFriend = ({ close }) => {

    const handlelose = () => {
        close()
    }


    return(
        <>
            <div className="find-a-friend-overlay">
                <div className="back-button-overlay">
                    <button className="nvm" onClick={close}>
                        <h1>&lt;</h1>
                    </button>
                </div>
                <div className="find-a-friend-container">
                    <div className="find-a-friend-title">
                        <h1>Find Friend by Username</h1>
                    </div>
                    <div className="type-in-username">
                        <input type="text" />
                        <button>
                            <img src={plus} alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddAFriend