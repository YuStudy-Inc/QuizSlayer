import { useNavigate } from "react-router-dom"
import Username from "./Input/Username";
import Password from "./Input/Password";
import "./LoginSignup.css"

const Login = ({onToggle}) => {

    const navigate = useNavigate();
    const routeHome = () => {
        navigate('../home')
    }

    const handleClick = (event) => {
        onToggle();
    }
    return (
        <>
        <div className="login-signup-container">
            <div className="login-signup-box">
                <h1 className="welcome-text">WELCOME BACK ADVENTURER</h1>
                <div className="input-fields">
                    <Username></Username>
                    <Password></Password>
                </div>
                <input type="submit" className="submit-button" id="login" value="Login" onClick={() => routeHome()}></input>
                <span className="to-signup-arrow login-signup-arrow" onClick={handleClick}>
                    <h1>&gt;</h1>
                </span>
            </div>
        </div>
            
        </>
    )
}

export default Login;