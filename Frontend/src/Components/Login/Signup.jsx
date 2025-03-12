import Username from "./Input/Username";
import Password from "./Input/Password";

import "./LoginSignup.css"

const Signup = () => {
    return (
        <>
            <div className="login_signup_box">
                <h1 className="welcome_text">HELP WANTED</h1>
                <Username></Username>
                <Password></Password>
                <Password></Password>
                <input type="submit" class="submit_button" id="signup" value="Sign Up" ></input>
            </div>
        </>
    )
}

export default Signup;