import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Email from "./Email";
import Password from "./Password";
import "../../Styles/Pages/LoginSignup/LoginSignup.css"

const Login = ({onToggle}) => {

    const [validEmail, setValidEmail] = useState(true);
    const [validated, setValidated] = useState(true);

    const navigate = useNavigate();
    const routeHome = () => {
        navigate('../home')
    }

    const handleClick = (event) => {
        onToggle();
    }

    const validateUser = (event) => {

    }

    return (
        <>
            <div className="login-signup-container">
                <div className="login-signup-box">
                    <h1 className="welcome-text">WELCOME BACK ADVENTURER</h1>
                    <form onClick={validateUser}>
                        <div className="input-fields">
                            <Email></Email>
                            <p className="error-text" hidden={validEmail}>* Invalid email address.</p>
                            <Password></Password>
                            <p className="error-text" hidden={validated}>* Incorrect email or password</p>
                        </div>
                        <input type="submit" className="submit-button" id="login" value="Login"></input>
                    </form>
                    <span className="to-signup-arrow login-signup-arrow" onClick={handleClick}>
                        <h1>&gt;</h1>
                    </span>
                </div>
            </div>
        </>
    )
}

export default Login;