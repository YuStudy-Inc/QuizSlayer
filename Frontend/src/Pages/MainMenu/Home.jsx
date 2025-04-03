import Alert from "../../Components/Alert"
import Podium from "../../Components/Podium"
import TodoList from "../../Components/Home/TodoList"
import FriendsActive from "../../Components/Home/FriendsActive"
import "../../Styles/Pages/Home.css"
import { useNavigate } from "react-router-dom"
import maomao from "../../assets/Friends/maomao.jpg"

const Home = () => {

    const navigate = useNavigate()

    return(
        <>
            {/* <Alert text="Ready to Begin" buttonOneText="no" functionButtonOne={() => {}} buttonTwoText="yes" functionButtonTwo={() => {}}/> */}
            <div className="home-container">
                <div className="profile-button-to-access-settings">
                    <button className="profile-button" onClick={() => navigate('/settings')}></button>
                    <img src={maomao} alt="" />
                </div>
                <div className="home-cards-container">
                    <TodoList className="home-todo-list" />
                    <div className="podium-centerer-home">
                        <Podium  />
                    </div>
                    <FriendsActive className="home-friends-active" />
                </div>
            </div>
        </>
    )
}

export default Home