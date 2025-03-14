import user_icon from "../../../assets/Login/user_icon.png"
import "./Input.css"

const Username = () => {
    return (
        <div className="input_container">
            <img src={user_icon} alt="user icon" className="icon"></img>
            <input className="input_box" type="text" placeholder="username"></input>
        </div>
    );
}

export default Username;