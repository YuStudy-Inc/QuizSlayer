import user_icon from "../../../assets/Login/user_icon.png"
import "./Input.css"

const Username = () => {
    return (
        <div className="input_container">
            <img src={user_icon} alt="user icon" class="icon"></img>
            <input class="input_box" type="text"></input>
        </div>
    );
}

export default Username;