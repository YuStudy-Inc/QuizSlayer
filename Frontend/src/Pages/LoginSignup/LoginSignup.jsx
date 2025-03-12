import '../../Styles/Pages/Login.css'
import { Login, Signup } from "../../Components/Components"

let login = true;
const LoginSignup = () => {
    return (
        <div className="login_page">
            <div className = "login_signup_container">
                {!login ?
                    <Login></Login> :
                    <Signup></Signup>
                }
            </div>
        </div>
    )
}

export default LoginSignup;