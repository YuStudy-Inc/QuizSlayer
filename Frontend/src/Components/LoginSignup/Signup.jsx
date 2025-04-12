import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Username from "./Username";
import Password from "./Password";
import Email from "./Email"
import "../../Styles/Pages/LoginSignup/LoginSignup.css"

const Signup = ({ onToggle }) => {

    const [validEmail, setValidEmail] = useState(true);
    const [validUsername, setValidUsername] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [matching, setMatching] = useState(true);

    const navigate = useNavigate();
    const routeHome = () => {
        navigate('../home')
    }

    const handleClick = () => {
        onToggle();
    }

    const validateForm = (event) => {
        event.preventDefault();
        console.log(event);
    }

    return (
        <>
            <div className="login-signup-container if-sign-up">
                <div className="login-signup-box">
                    <h1 className="welcome-text">HELP WANTED</h1>
                    <form onSubmit={validateForm}>
                        <div className="input-fields">
                            <Email></Email>
                            <p className="error-text" hidden={validEmail}>* Invalid email address.</p>
                            <Username></Username>
                            <p className="error-text" hidden={validUsername}>* Minimum x characters required</p>
                            <Password></Password>
                            <p className="error-text" hidden={validPassword}>* Invalid password</p>
                            <Password></Password>
                            <p className="error-text" hidden={matching}>* Passwords do not match</p>
                        </div>
                        <input type="submit" className="submit-button" id="signup" value="Sign Up"></input>
                    </form>
                    <span className="to-login-arrow login-signup-arrow" onClick={handleClick}>
                        <h1>&lt;</h1>
                    </span>
                </div>
            </div>
        </>
    )
}

export default Signup;