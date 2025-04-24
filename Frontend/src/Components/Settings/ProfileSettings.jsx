import {useState, useRef} from 'react';
import "../../Styles/Pages/Settings.css"
import { maomao, pencil } from "../../assets/Pictures"
import axios from "axios"
const user = JSON.parse(localStorage.getItem('user'));
const ProfileSettings = () => {
  const [username, setUsername] = useState(user.username);
  const [description, setDescription] = useState(user.description);
  const [profilePic, setProfilePic] = useState(user.pfp)
  const onProfilePicChange = (e) => {
    // handle profile pic change if needed
  };
  const onSaveChanges = async () => {
    axios({
      method: "put",
      url: `https://00qy8vpnab.execute-api.us-east-1.amazonaws.com/users/editUser/${user._id}`,
      data: {
        username: username,
        description: description
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      console.log("Update Success:", response.data);
      alert("It worked")
      // Update local storage or UI with new user data if needed
      localStorage.setItem('user', JSON.stringify(response.data));
    })
    .catch((error) => {
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
        <div className="profile-settings active-settings">
        <div className="profile-picture-edit move">
        <img className="pencil-profile-pic" src={pencil} alt="" />
        <div className="black-overlay-for-the-profile-pic"></div>
        <img className="profile-picture-rn" src={profilePic} alt="" />
          <input className="new-pfp" type="file" onChange={onProfilePicChange} />
        </div>
  
        <div className="username-edit move">
          <h1>Username</h1>
          <input
            className="new-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
  
        <div className="description-edit move">
          <h1>Description</h1>
          <textarea
            className="new-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
  
        <button className="submit-profile-edit move" onClick={onSaveChanges}>
          Save Changes
        </button>
      </div>

    )
        
    
}

export default ProfileSettings;