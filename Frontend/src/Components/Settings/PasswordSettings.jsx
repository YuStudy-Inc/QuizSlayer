import {useState, useRef} from 'react';
import "../../Styles/Pages/Settings.css"
import axios from "axios"
const user = JSON.parse(localStorage.getItem('user'));
const PasswordSettings = ()=>{
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordAgain, setNewPasswordAgain] = useState('');
    const url = `https://00qy8vpnab.execute-api.us-east-1.amazonaws.com/users/editUser/password/${user._id}`
    const onSaveChanges = async() =>{
        axios({
            method: "put",
            url: url,
            data: {
            oldPassword,
            newPassword,
            newPasswordAgain
            },
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then((response) => {
            console.log("Update Success:", JSON.stringify(response.data));
            alert("It worked")
          })
          .catch((error)=>{
            console.log("Old Password: ", oldPassword, "New Password", newPassword, "New Password Again", newPasswordAgain)
            const response = error.response;
            alert("It did not work")
            if (response) {
                console.log(response.data);
                console.log(response.status);
                console.log(response.headers);
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log("Error", error.message);
              }
          });
    };
    return(
        <div className="password-settings active-settings">
        <div className="old-password move">
            <h1>Old Password</h1>
            <input 
            className="old-password" 
            type="password"
            onChange={(e) => setOldPassword(e.target.value)}
            />
        </div>
        <div className="password-edit move">
            <h1>New Password</h1>
            <input className="new-password" 
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
            />
        </div>
        <div className="password-edit-again move">
            <h1>Retype New Password</h1>
            <input 
            className="new-password-again" 
            type="password"
            onChange={(e) => setNewPasswordAgain(e.target.value)}
            />
        </div>
        <button className="submit-password-edit move" onClick={onSaveChanges}>Save Changes</button>
    </div>

    )
        
    
}
export default PasswordSettings;