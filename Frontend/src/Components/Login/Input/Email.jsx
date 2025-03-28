import emailIcon from "../../../assets/Login/email_icon.png"
import "./Input.css"

const Email = () => {
    return (
        <div className="input_container">
            <img src={emailIcon} alt="email icon" className="icon"></img>
            <input className="input_box" type="text" placeholder="email"></input>
        </div>
    );
}

export default Email;