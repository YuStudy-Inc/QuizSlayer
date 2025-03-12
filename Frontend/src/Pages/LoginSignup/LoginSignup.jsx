import '../../Styles/Pages/Login.css';
import { Login, Signup } from "../../Components/Components";
import { useLocation } from "react-router-dom";

const LoginSignup = () => {
    const location = useLocation();
    const login = location.state?.isLogin ?? true;

    return (
        <div className="login_page">
            <div className = "login_signup_container">
                {login ?
                    <Login></Login> :
                    <Signup></Signup>
                }
            </div>
        </div>
    )
}

export default LoginSignup;