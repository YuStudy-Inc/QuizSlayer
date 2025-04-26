import { Alert, Podium, TodoList, FriendsActive, Notifications } from "../../Components/Components"
import "../../Styles/Pages/MainMenu/Home.css"
import { useNavigate } from "react-router-dom"
import { maomao, bell } from "../../assets/Pictures"
import { useState } from "react"
import UserData from "../../UserData.js"

const Home = () => {
    const [openNotifications, setOpenNotifications] = useState(false)

    const navigate = useNavigate()
    UserData.updateUserData();

    return(
        <>
            {/* <Alert text="Ready to Begin" buttonOneText="no" functionButtonOne={() => {}} buttonTwoText="yes" functionButtonTwo={() => {}}/> */}
            <div className="home-container">
                <div className="nav-buttons">
                    <div className="notification-section">
                        <img src={bell} alt="" onClick={() => setOpenNotifications(!openNotifications)}/></div>    
                    <div className="profile-button-to-access-settings">
                        <button className="profile-button" onClick={() => navigate('/settings')}></button>
                        <img src={maomao} alt="" />
                    </div>
                </div>
                <div className="home-cards-container">
                    <TodoList className="home-todo-list" />
                    <div className="podium-centerer-home">
                        <Podium  />
                    </div>
                    <FriendsActive className="home-friends-active" />
                </div>
                {openNotifications && (<Notifications />)}
            </div>
        </>
    )
}

export default Home