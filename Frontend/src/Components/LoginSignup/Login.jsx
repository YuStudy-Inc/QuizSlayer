import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Email from "./Email";
import Password from "./Password";
import "../../Styles/Pages/LoginSignup/LoginSignup.css"

const Login = ({onToggle}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [validEmail, setValidEmail] = useState(true);
    const [validated, setValidated] = useState(true);

    const navigate = useNavigate();
    const routeHome = () => {
        navigate('../home')
    }

    const handleClick = (event) => {
        onToggle();
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(!validateEmail(formData.email)) {
            setValidEmail(false);
        }
        else {
            setValudEmail(true);
        }
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
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