import { Podium, TodoList, FriendsActive, Notifications } from "../../Components/Components"
import "../../Styles/Pages/MainMenu/Home.css"
import { useNavigate } from "react-router-dom"
import { bell } from "../../assets/Pictures"
import { useState } from "react"
import UserData from "../../UserData.js"

const Home = () => {
    const [openNotifications, setOpenNotifications] = useState(false)
    // const [userCharacter, setUserCharacter] = UserData ? useState(UserData.getSelectedCharacter()) : useState (1);
    // const [userWeapon, setUserWeapon] = UserData ? userState(UserData.getSelectedWeapon()) :  useState(0);
    // const [userHat, setUserHat] = UserData ? userState(UserData.getSelectedWeapon()) :  useState(0);
    const navigate = useNavigate()

    return(
        <>
            <div className="home-container">
                <div className="nav-buttons">
                    <div className="notification-section">
                        <img src={bell} alt="" onClick={() => setOpenNotifications(!openNotifications)}/></div>    
                    <div className="profile-button-to-access-settings">
                        <button className="profile-button" onClick={() => navigate('/settings')}></button>
                        <img src={UserData.getPfp()} alt="" />
                    </div>
                </div>
                <div className="home-cards-container">
                    <TodoList className="home-todo-list" />
                    <div className="podium-centerer-home">
                        <Podium character={UserData.getSelectedCharacter()} hat={UserData.getSelectedHat()} weapon={UserData.getSelectedWeapon()}/>
                    </div>
                    <FriendsActive className="home-friends-active" />
                </div>
                {openNotifications && (<Notifications />)}
            </div>
        </>
    )
}

export default Home