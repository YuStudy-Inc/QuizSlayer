import React from 'react';
import "../../Styles/Pages/Settings.css"

const AccountSettings = ({
   oldPassword,
   newPassword,
   newPasswordAgain
})=>{
    return(
        <div className="account-settings active-settings">
        <button className="submit-logout-account move">Logout</button>
        <button className="submit-delete-account move">Delete Account</button>
        </div>
    )
}
export default AccountSettings;