import { useState } from "react";

import lockIcon from "../../../assets/Login/lock_icon.png"

import { Icon, SvgIcon } from '@mui/material';
import eye from '@mui/icons-material/VisibilityOutlined';
import eyeOff from '@mui/icons-material/VisibilityOffOutlined';

import "./Input.css"

const Password = () => {
    const[password, setPassword] = useState("");
    const [icon, setIcon] = useState(eyeOff);
    const [type, setType] = useState("password");

    const togglePasswordDisplay = () => {
        if (icon===eyeOff){
           setIcon(eye);
           setType("text");
        } else {
           setIcon(eyeOff);
           setType("password");
        }
     }

    return (
        <div className="input_container">
            <img src={lockIcon} alt="lock icon" className="icon"></img>
            <input className="input_box" type={type} value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <span className="password_toggle" onClick={togglePasswordDisplay}>
                <SvgIcon component={icon}></SvgIcon>
            </span>
        </div>
    );
};

export default Password;