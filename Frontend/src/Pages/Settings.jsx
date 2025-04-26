import "../Styles/Pages/Settings.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {ProfileSettings, PasswordSettings, AccountSettings} from "../Components/Components";

const Settings = () => {
    const settingsOptions = ["Profile", "Password", "Account"]
    const [activeSettings, setActiveSettings] = useState("Profile");
    const navigate = useNavigate()

    const handleLeftSettings = () => {
        const currentIndex = settingsOptions.indexOf(activeSettings);
        if (currentIndex> 0) {
            setActiveSettings(settingsOptions[currentIndex-1])
        }
    }

    const handleRightSettings = () => {
        const currentIndex = settingsOptions.indexOf(activeSettings);
        if (currentIndex< settingsOptions.length-1) {
            setActiveSettings(settingsOptions[currentIndex+1])
        }
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
                        {settingsOptions.map((option) => (
                            <button
                                key={option}
                                onClick={() => setActiveSettings(option)}
                                className={activeSettings === option ? "active-settings" : ""}
                            >
                                <h1>{option}</h1>
                            </button>
                        ))}
                        </div>
                        <div className="left-options-mobile">
                        <button 
                            onClick={handleLeftSettings} 
                            className={`settings-button-nav ${activeSettings === settingsOptions[0] ? "hidden" : ""}`}
                        >
                            <h1>&lt;</h1>
                        </button>
                        <h1>{activeSettings}</h1>
                        <button 
                            onClick={handleRightSettings} 
                            className={`settings-button-nav ${activeSettings === settingsOptions[settingsOptions.length - 1] ? "hidden" : ""}`}
                        >
                            <h1>&gt;</h1>
                        </button>
                        </div>
                        <div className="divider-settings"></div>
                        <div className="right-changing-options">
                        {activeSettings === "Profile" && <ProfileSettings />}
                        {activeSettings === "Password" && <PasswordSettings />}
                        {activeSettings === "Account" && <AccountSettings />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings