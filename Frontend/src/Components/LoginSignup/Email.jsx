import emailIcon from "../../assets/LoginSignup/email_icon.png"
import "../../Styles/Components/LoginSignup/Input.css"

const Email = ({stateChanger}) => {
    return (
        <>
            <div className="input_container">
                <img src={emailIcon} alt="email icon" className="icon"></img>
                <input className="input_box" type="text" placeholder="Email" onChange={ (e) => stateChanger(e.target.value)}></input>
            </div>
        </>
    );
}

export default Email;