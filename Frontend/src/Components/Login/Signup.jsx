import { useNavigate } from "react-router-dom"
import Username from "./Username";
import Password from "./Password";
import "../../Styles/Pages/LoginSignup.css"

const Signup = ({ onToggle }) => {

    const navigate = useNavigate();
    const routeHome = () => {
        navigate('../home')
    }

    const handleClick = () => {
        onToggle();
    }

    return (
        <>
            <div className="login-signup-container if-sign-up">
                <div className="login-signup-box">
                    <h1 className="welcome-text">HELP WANTED</h1>
                    <div className="input-fields">
                        <Username></Username>
                        <Password></Password>
                        <Password></Password>
                    </div>
                    <input type="submit" className="submit-button" id="signup" value="Sign Up" onClick={() => routeHome()}></input>
                    <span className="to-login-arrow login-signup-arrow" onClick={handleClick}>
                        <h1>&lt;</h1>
                    </span>
                </div>
            </div>
        </>
    )
}

export default Signup;