import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"
import Username from "./Username";
import Password from "./Password";
import Email from "./Email"
import "../../Styles/Pages/LoginSignup/LoginSignup.css"
import UserData from "../../UserData";

import Alert from "../Alert";

import axios from "axios";

const endpointUri = import.meta.env.VITE_APP_URI;

const Signup = ({ onToggle }) => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordAgain: ''
    });
    const [validEmail, setValidEmail] = useState(true);
    const [validUsername, setValidUsername] = useState(true);
    const [noPassword, setNoPassword] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [matching, setMatching] = useState(true);

    const [validated, setValidated] = useState(true);
    const [validating, setValidating] = useState(false);
    const validatingRef = useRef(false);

    //predeployment remove when done
    const [sorryAlert, setSorryAlert] = useState(false)

    const navigate = useNavigate();
    const routeHome = () => {
        navigate('../home')
        window.location.reload();
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
        let valid = true;

        if(!validateEmail(formData.email)) {
            setValidEmail(false);
            valid = false;
        }
        else {
            setValidEmail(true);
        }

        if(formData.username == "") {
            setValidUsername(false);
            valid = false;
        }
        else {
            setValidUsername(true);
        }

        if(formData.password == "") {
            setNoPassword(false);
            valid = false;
        }
        else if(!validatePassword(formData.password)) {
            setNoPassword(true);
            setValidPassword(false);
            valid = false;
        }
        else if(formData.password != formData.passwordAgain) {
            setValidPassword(true);
            setMatching(false);
            valid = false;
        }
        else {
            setNoPassword(true);
            setValidPassword(true);
            setMatching(true);
        }

        if(!valid) {
            validatingRef.current = false;
            setValidating(false);
            return;
        }

        attemptSignup();
    }

    const attemptSignup = async () => {
            axios({
                method: "post",
                url: endpointUri + "users/createUser",
                data: formData,
                withCredentials:true,
            })
            .then((response) => {
                UserData.updateUserData(response.data.user);
                setValidated(validated)
                routeHome();
            })
            .catch((error) => {
                const response = error.response
                if(response) {
                    console.log(response.data);
                    console.log(response.status);
                    console.log(response.headers);
                }
                else if(error.request) {
                    console.log(error.request);
                }
                else {
                    console.log("Error", error.message);
                }
                setValidated(false);
            }).finally(() => {
                setTimeout(() => {
                    if(validatingRef.current == true) {
                        setValidating(false);
                        validatingRef.current = false;
                    }
                },1000)
            })
        }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const validatePassword = ((password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{9,}$/
        return passwordRegex.test(password)
    })

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
                {/* remove */}
            {sorryAlert && <Alert text={"Sorry, the game is not ready to play yet ... 5/6/25"} buttonOneText={"Ok"} functionButtonOne={() => {setSorryAlert(false)}} show={true}/>}
                <div className="login-signup-box">
                    <h1 className="welcome-text">HELP WANTED</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-fields">
                            <Email stateChanger={setEmail}></Email>
                            <p className="error-text" hidden={validEmail}>* Invalid email address.</p>
                            <Username stateChanger={setUsername}></Username>
                            <p className="error-text" hidden={validUsername}>* Minimum x characters required</p>
                            <Password stateChanger={setPassword}></Password>
                            <Password stateChanger={setPasswordAgain}></Password>
                            <p className="error-text" hidden={noPassword}>* Enter a password</p>
                            <p className="error-text" hidden={validPassword}>Password must be: <br/> * At least 9 characters <br/> * Includes at least one uppercase letter <br/> * Includes a number <br/> * Includes a special character (@$!%*?&_.)</p>
                            <p className="error-text" hidden={matching}>* Passwords do not match</p>
                        </div>
                        {/* <input type="submit" className="submit-button" id="signup" value="Sign Up" disabled={validating}></input> */}
                        <button className="submit-button" id="signup" onClick={() => {setSorryAlert(true)}}>Sign Up</button>
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