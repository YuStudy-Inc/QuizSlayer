import { Alert, Podium, TodoList, FriendsActive, Notifications } from "../../Components/Components"
import "../../Styles/Pages/MainMenu/Home.css"
import { useNavigate } from "react-router-dom"
import { maomao, bell } from "../../assets/Pictures"
import { useState, useEffect } from "react"
import UserData from "../../UserData.js"
import axios from "axios"

const URI = import.meta.env.VITE_APP_URI
const userId = JSON.parse(localStorage.getItem('id'))

const Home = () => {
    const [openNotifications, setOpenNotifications] = useState(false)
    // const [userCharacter, setUserCharacter] = UserData ? useState(UserData.getSelectedCharacter()) : useState (1);
    // const [userWeapon, setUserWeapon] = UserData ? userState(UserData.getSelectedWeapon()) :  useState(0);
    // const [userHat, setUserHat] = UserData ? userState(UserData.getSelectedWeapon()) :  useState(0);
    const [userPfp, setUserPfp] = useState("")

    console.log(userPfp)

    const navigate = useNavigate()

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`${URI}users/getUser/${userId}`, {
                    withCredentials: true
                })
                if (response.status === 200) {
                    setUserCharacter(response.data.user.selectedCharacter)
                    setUserWeapon(response.data.user.selectedWeapon)
                    setUserHat(response.data.user.selectedHat)
                    setUserPfp(response.data.user.pfp)
                }
            }
            catch (e) {
                console.log(e)
            }
        }
        getUser()
    }, [URI, userId])
    // useEffect(() => {
    //     const getUser = async () => {
    //         try {
    //             const user = await axios.get(`${URI}users/getUser/${userId}`, {
    //                 withCredentials: true
    //             })
    //             setUserCharacter(user.data.selectedCharacter)
    //             setUserWeapon(user.data.selectedWeapon)
    //             setUserHat(user.data.selectedHat)
    //             setUserPfp(user.data.pfp)
    //         }
    //         catch (e) {
    //             console.log(e)
    //         }
    //     }
    //     getUser()
    // }, [URI, userId])

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