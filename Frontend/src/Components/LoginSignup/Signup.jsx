import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"
import Username from "./Username";
import Password from "./Password";
import Email from "./Email"
import "../../Styles/Pages/LoginSignup/LoginSignup.css"

const Signup = ({ onToggle }) => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordAgain: ''
    });
    const [validEmail, setValidEmail] = useState(true);
    const [validUsername, setValidUsername] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [matching, setMatching] = useState(true);

    const [validated, setValidated] = useState(true);
    const [validating, setValidating] = useState(false);
    const validatingRef = useRef(false);

    const navigate = useNavigate();
    const routeHome = () => {
        navigate('../home')
    }

    const handleClick = () => {
        onToggle();
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validatingRef.current === false) {
            setValidating(true);
            setValidated(true);
            validatingRef.current = true;
        } else {
            return;
        }

        if(formData.password == "") {
            setHasPassword(false);
        }
        else {
            setHasPassword(true);
        }

        if(!validateEmail(formData.email)) {
            validatingRef.current = false;
            setValidating(false);
            setValidEmail(false);
            return;
        }
        else {
            setValidEmail(true);
        }
        attemptLogin();
    }

    const setEmail = (email) => {
        setFormData(previousState => {
            return { ...previousState, email: email}
        })
    }

    const setUsername = (username) => {
        setFormData(previousState => {
            return { ...previousState, username: username}
        })
    }

    const setPassword = (password) => {
        setFormData(previousState => {
            return { ...previousState, password: password}
        })
    }

    const setPasswordAgain = (password) => {
        setFormData(previousState => {
            return { ...previousState, passwordAgain: password}
        })
    }

    return (
        <>
            <div className="login-signup-container if-sign-up">
                <div className="login-signup-box">
                    <h1 className="welcome-text">HELP WANTED</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-fields">
                            <Email stateChanger={setEmail}></Email>
                            <p className="error-text" hidden={validEmail}>* Invalid email address.</p>
                            <Username stateChanger={setUsername}></Username>
                            <p className="error-text" hidden={validUsername}>* Minimum x characters required</p>
                            <Password stateChanger={setPassword}></Password>
                            <p className="error-text" hidden={validPassword}>* Invalid password</p>
                            <Password stateChanger={setPasswordAgain}></Password>
                            <p className="error-text" hidden={matching}>* Passwords do not match</p>
                        </div>
                        <input type="submit" className="submit-button" id="signup" value="Sign Up" disabled={validating}></input>
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