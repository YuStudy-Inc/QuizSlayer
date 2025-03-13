import Navbar from "../Components/Navbar"
import Alert from "../Components/Alert"
import Podium from "../Components/Podium"
import TodoList from "../Components/TodoList"
import FriendsActive from "../Components/FriendsActive"
import "../Styles/Pages/Home.css"
import { useState } from "react"

const Home = () => {
    const [characters, setCharacters] = useState([])

    const getCharacters = () => {
        fetch("http://127.0.0.1:3000/getCharacters", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
          })
        .then(response => {
            if (response.status !== 200) {
                throw new Error(`error: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            const arrayOfNames = Object.values(data.characters)

            setCharacters(arrayOfNames)
        })
        .catch (e => {
        console.error(e)
        })
    }


    return(
        <>
            {/* <Alert text="Ready to Begin" buttonOneText="no" functionButtonOne={() => {}} buttonTwoText="yes" functionButtonTwo={() => {}}/> */}
            <Navbar />
            <div className="home-container">
                <div className="home-cards-container">
                    <TodoList className="home-todo-list" />
                    <Podium className="home-podium" />  
                    <FriendsActive className="home-friends-active" />
                </div>
                <button type="button" onClick={getCharacters} style={{width:"300px",height:"300px"}}>get the characters</button>
                {characters && characters.map((character) => (
                    <p>{character.name}</p>
                ))}
            </div>
        </>
    )
}

export default Home