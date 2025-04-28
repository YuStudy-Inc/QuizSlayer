import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"
import Email from "./Email";
import Password from "./Password";
import "../../Styles/Pages/LoginSignup/LoginSignup.css"
import UserData from "../../UserData";

import axios from "axios";

const URI = import.meta.env.VITE_APP_URI;

const Login = ({onToggle}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [validated, setValidated] = useState(true);
    const [validating, setValidating] = useState(false);
    const validatingRef = useRef(false);
    const url = import.meta.env.VITE_APP_URI || '';
    const navigate = useNavigate();
    const routeHome = () => {
        navigate('../home');
        window.location.reload();
    }

    const handleClick = (event) => {
        onToggle();
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (validatingRef.current === false) {
            setValidating(true);
            setValidated(true);
            validatingRef.current = true;
        } else {
            return;
        }
        let valid = true;

        if(formData.password == "") {
            setValidPassword(false);
            valid = false;
        }
        else {
            setValidPassword(true);
        }

        if(!validateEmail(formData.email)) {
            setValidEmail(false);
            valid = false;
        }
        else {
            setValidEmail(true);
        }

        if(!valid) {
            validatingRef.current = false;
            setValidating(false);
            return;
        }

        attemptLogin();
    }

    const attemptLogin = async () => {
        axios({
            method: "post",
            url: URI + "users/loginUser",
            data: formData,
            headers: {
                "Content-Type": "application/json"
              }
        })
        .then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('id', JSON.stringify(response.data.user._id));
            UserData.updateUserData();
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

    const handleChange = (event) => {

    }

    const setEmail = (email) => {
        setFormData(previousState => {
            return { ...previousState, email: email}
        })
    }

    const setPassword = (password) => {
        setFormData(previousState => {
            return { ...previousState, password: password}
        })
    }

    return (
        <>
            <div className="login-signup-container">
                <div className="login-signup-box">
                    <h1 className="welcome-text">WELCOME BACK ADVENTURER</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-fields">
                            <Email stateChanger={setEmail}></Email>
                            <p className="error-text" hidden={validEmail}>* Invalid email address.</p>
                            <Password stateChanger={setPassword}></Password>
                            <p className="error-text" hidden={validPassword}>* Enter a password</p>
                            <p className="error-text" hidden={validated}>* Incorrect email or password</p>
                        </div>
                        <input type="submit" className="submit-button" id="login" value="Login" disabled={validating}/>
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