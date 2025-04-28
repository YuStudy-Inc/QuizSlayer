import { Alert, Podium, TodoList, FriendsActive, Notifications } from "../../Components/Components"
import "../../Styles/Pages/MainMenu/Home.css"
import { useNavigate } from "react-router-dom"
import { maomao, bell } from "../../assets/Pictures"
import { useState, useEffect } from "react"
import UserData from "../../UserData.js"

const URI = import.meta.env.VITE_APP_URI
const userId = JSON.parse(localStorage.getItem('id'))

const Home = () => {
    const [openNotifications, setOpenNotifications] = useState(false)
    const [userCharacter, setUserCharacter] = useState(1)
    const [userWeapon, setUserWeapon] = useState(0)
    const [userHat, setUserHat] = useState(0)
    const [userPfp, setUserPfp] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await axios.get(`${URI}users/getUser/${userId}`)
                setUserCharacter(user.data.selectedCharacter)
                setUserWeapon(user.data.selectedWeapon)
                setUserHat(user.data.selectedHat)
                setUserPfp(user.data.pfp)
            }
            catch (e) {
                console.log(e)
            }
        }
        getUser()
    }, [URI, userId])

    return(
        <>
            {/* <Alert text="Ready to Begin" buttonOneText="no" functionButtonOne={() => {}} buttonTwoText="yes" functionButtonTwo={() => {}}/> */}
            <div className="home-container">
                <div className="nav-buttons">
                    <div className="notification-section">
                        <img src={bell} alt="" onClick={() => setOpenNotifications(!openNotifications)}/></div>    
                    <div className="profile-button-to-access-settings">
                        <button className="profile-button" onClick={() => navigate('/settings')}></button>
                        <img src={userPfp} alt="" />
                    </div>
                </div>
                <div className="home-cards-container">
                    <TodoList className="home-todo-list" />
                    <div className="podium-centerer-home">
                        <Podium character={userCharacter} hat={userHat} weapon={userWeapon}/>
                    </div>
                    <FriendsActive className="home-friends-active" />
                </div>
                {openNotifications && (<Notifications />)}
            </div>
        </>
    )
}

export default Home