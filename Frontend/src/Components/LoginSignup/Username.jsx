import { userIcon } from "../../assets/Pictures"
import "../../Styles/Components/LoginSignup/Input.css"

const Username = () => {
    return (
        <div className="input_container">
            <img src={userIcon} alt="user icon" className="icon"></img>
            <input className="input_box" type="text" placeholder="username"></input>
        </div>
    );
}

export default Username;