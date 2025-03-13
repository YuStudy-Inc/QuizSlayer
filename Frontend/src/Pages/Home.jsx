// import Navbar from "../Components/Navbar"
import Alert from "../Components/Alert"
import Podium from "../Components/Podium"
import TodoList from "../Components/TodoList"
import FriendsActive from "../Components/FriendsActive"
import "../Styles/Pages/Home.css"

const Home = () => {
    return(
        <>
            {/* <Alert text="Ready to Begin" buttonOneText="no" functionButtonOne={() => {}} buttonTwoText="yes" functionButtonTwo={() => {}}/> */}
            {/* <Navbar /> */}
            <div className="home-container">
                <div className="home-cards-container">
                    <TodoList className="home-todo-list" />
                    <Podium className="home-podium" />  
                    <FriendsActive className="home-friends-active" />
                </div>
            </div>
        </>
    )
}

export default Home