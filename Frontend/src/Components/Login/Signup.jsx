import Username from "./Input/Username";
import Password from "./Input/Password";

import { SvgIcon } from '@mui/material';
import leftArrow from '@mui/icons-material/ArrowBackIosRounded';

import "./LoginSignup.css"

const Signup = ({ onToggle }) => {
    const handleClick = () => {
        console.log(0)
        onToggle();
    }

    return (
        <>
        <div className="login_signup_container">
            <div className="login_signup_box">
                <h1 className="welcome_text">HELP WANTED</h1>
                <Username></Username>
                <Password></Password>
                <Password></Password>
                <input type="submit" className="submit_button" id="signup" value="Sign Up" ></input>
                <span className="to_login_arrow login_signup_arrow" onClick={handleClick}>
                    <SvgIcon component={leftArrow}></SvgIcon>
                </span>
            </div>
        </div>
        </>
    )
}

export default Signup;