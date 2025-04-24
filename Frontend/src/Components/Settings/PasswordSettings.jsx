import React from 'react';
import "../../Styles/Pages/Settings.css"

const PasswordSettings = ({
   oldPassword,
   newPassword,
   newPasswordAgain
})=>{
    return(
        <div className="password-settings active-settings">
        <div className="old-password move">
            <h1>Old Password</h1>
            <input className="old-password" type="text"/>
        </div>
        <div className="password-edit move">
            <h1>New Password</h1>
            <input className="new-password" type="text"/>
        </div>
        <div className="password-edit-again move">
            <h1>Retype New Password</h1>
            <input className="new-password-again" type="text"/>
        </div>
        <button className="submit-password-edit move">Save Changes</button>
    </div>

    )
        
    
}
export default PasswordSettings;