import "../Styles/Pages/Settings.css"
import { useNavigate } from "react-router-dom"
import maomao from "../assets/Friends/maomao.jpg"
import pencil from "../assets/Quizzes/pencil.png"

const Settings = () => {

    const navigate = useNavigate()

    const toggleActive = (whichSettings) => {
        document.querySelector(".active-settings")?.classList.toggle("active-settings")
        document.querySelector(`.${whichSettings}`)?.classList.toggle("active-settings")
    }

    return(
        <>
            <div className="settings-container">
                <div className="back">
					<button className="back-button" onClick={() => navigate('/home')}>
						<h1>&lt;</h1>
					</button>
				</div>
                <div className="container-options">
                    <div className="settings-title">
                        <h1>Settings</h1>
                    </div>
                    <div className="settings-contents">
                        <div className="left-options">
                            <button onClick={() => toggleActive("profile-settings")}><h1>Profile</h1></button>
                            <button onClick={() => toggleActive("password-settings")}><h1>Password</h1></button>
                            <button onClick={() => toggleActive("account-settings")}><h1>Account</h1></button>
                        </div>
                        <div className="divider-settings"></div>
                        <div className="right-changing-options">
                            <div className="profile-settings ">
                                <div className="profile-picture-edit move">
                                    <img className="pencil-profile-pic" src={pencil} alt="" />
                                    <div className="black-overlay-for-the-profile-pic"></div>
                                    <img className="profile-picture-rn" src={maomao} alt="" />
                                    <input className="new-pfp" type="file" />
                                </div>
                                <div className="username-edit move">
                                    <h1>username</h1>
                                    <input className="new-username" type="text"/>
                                </div>
                                <div className="description-edit move">
                                    <h1>Description</h1>
                                    <textarea className="new-description"></textarea>
                                </div>
                                <button className="submit-profile-edit move">Save Changes</button>
                            </div>
                            <div className="password-settings">
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
                            <div className="account-settings">
                                <button className="submit-logout-account move">Logout</button>
                                <button className="submit-delete-account move">Delete Account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings