import '../../Styles/Pages/LoginSignup/Login.css';
import { Login, Signup } from "../../Components/Components";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const LoginSignup = () => {
    const location = useLocation();
    const login = location.state?.isLogin ?? true;

    const [isSignup, setIsSignup] = useState(() => {
        return login ? 0 : 1
    });

    const handleToggle = (signup) => {
        setIsSignup(signup);
    };

    return (
        <div className="login_page" style={{ '--signup': isSignup }}>
            <div className="login-signup-carousel-container">
                <Login onToggle={() => handleToggle(1)} />
                <Signup onToggle={() => handleToggle(0)} />
            </div>
        </div>
    );
}

export default LoginSignup;