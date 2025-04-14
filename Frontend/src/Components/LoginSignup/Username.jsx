import { userIcon } from "../../assets/Pictures"
import "../../Styles/Components/LoginSignup/Input.css"

const Username = ({stateChanger}) => {
    return (
        <div className="input_container">
            <img src={userIcon} alt="user icon" className="icon"></img>
            <input className="input_box" type="text" placeholder="Username" onChange={(e) => {stateChanger(e.target.value)}}></input>
        </div>
    );
}

export default Username;