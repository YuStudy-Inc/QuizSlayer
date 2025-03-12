import lock_icon from "../../../assets/Login/lock_icon.png"
import "./Input.css"

const Password = () => {
    return (
        <div className="input_container">
            <img src={lock_icon} alt="lock icon" className="icon"></img>
            <input className="input_box" type="text"></input>
        </div>
    );
};

export default Password;