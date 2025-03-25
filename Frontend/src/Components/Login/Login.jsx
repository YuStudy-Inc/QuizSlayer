import { useNavigate } from "react-router-dom"

import Username from "./Input/Username";
import Password from "./Input/Password";

import { SvgIcon } from '@mui/material';
import rightArrow from '@mui/icons-material/ArrowForwardIosRounded';

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
        <div className="login_signup_container">
            <div className="login_signup_box">
                <h1 className="welcome_text">WELCOME BACK ADVENTURER</h1>
                <Username></Username>
                <Password></Password>
                <input type="submit" className="submit_button" id="login" value="Login" onClick={() => routeHome()}></input>
                <span className="to_signup_arrow login_signup_arrow" onClick={handleClick}>
                    <SvgIcon component={rightArrow}></SvgIcon>
                </span>
            </div>
        </div>
            
        </>
    )
}

export default Login;