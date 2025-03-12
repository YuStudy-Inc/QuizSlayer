import Username from "./Input/Username";
import Password from "./Input/Password";

import "./LoginSignup.css"

const Login = () => {
    return (
        <>
            <div className="login_signup_box">
                <h1 className="welcome_text">WELCOME BACK ADVENTURER</h1>
                <Username></Username>
                <Password></Password>
                <input type="submit" class="submit_button" id="login" value="Login" ></input>
            </div>
        </>
    )
}

export default Login;