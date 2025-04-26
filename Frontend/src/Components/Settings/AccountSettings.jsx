import {useState, useRef} from 'react';
import { useNavigate } from "react-router-dom"
import "../../Styles/Pages/Settings.css"
import axios from 'axios'
import Alert from "../Alert"
const user = JSON.parse(localStorage.getItem('user'));
const AccountSettings = ()=>
{
  const [showAlert, setShowAlert] = useState(false)
  const [alertText, setAlertText] = useState('')
    const url = `https://00qy8vpnab.execute-api.us-east-1.amazonaws.com/users/deleteUser/${user._id}`
    const navigate = useNavigate();
    const routeHomePage = () => {
      navigate('/')
  }
    const closeAlert = () => {
      setShowAlert(false);
  };
    const deleteAccount = async() =>{
        axios({
            method: "delete",
            url: url,
            data: {
            },
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then((response) => {
            setAlertText(response.data.message || "Request successful!");
            setShowAlert(true);
            console.log("Update Success:", JSON.stringify(response.data));
            routeHomePage()
          })
          .catch((error)=>{
            const response = error.response;
            setAlertText(error.response?.data?.message || "Something went wrong.");
            setShowAlert(true);
            // alert("It did not work")
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
      <>
         {showAlert && (
        <Alert
          text={alertText}
          buttonOneText="OK"
          functionButtonOne={closeAlert}
          />
          )}
        <div className="account-settings active-settings">
        <button className="submit-logout-account move" onClick={routeHomePage}>Logout</button>
        <button className="submit-delete-account move" onClick={deleteAccount}>Delete Account</button>
        </div>
        </>
    )
}
export default AccountSettings;