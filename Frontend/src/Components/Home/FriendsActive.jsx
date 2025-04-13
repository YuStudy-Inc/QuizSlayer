import "../../Styles/Components/Home/FriendsActive.css"
import { useEffect, useState } from "react"
import axios from "axios"
 

const FriendsActive = ({ className= "", friends }) => {
    const [showSpreadOut, setShowSpreadOut] = useState(false)

    const toggleSpreadOut = () => {
        setShowSpreadOut(!showSpreadOut)
    }

    useEffect(() => {
        const fetchActiveFriends = async () => {
            const allActiveFriends = await axios.get("")
        }
    }, [])


    return (
        <>
            <div className={`friends-active-container ${className}`}>
                <h1>Active</h1>
                {/* add the list of friends from the db */}
                <div className="info-on-the-normal none">
                    <p>No Friends Active...</p>
                </div>
            </div>

            <div className="small-friends-active-container">
                <button className="toggle-spread" onClick={() => toggleSpreadOut()}>
                    <h1>Active</h1>
                </button>
            </div>
            <div className={`spread-out-container ${showSpreadOut ? "shown" : ""}`} onClick={() => toggleSpreadOut()}>
                <div className="spread-out">
                    <h1>Active</h1>
                    {/* if no friends, add the none className */}
                    <div className="info-on-the-spread-out none">
                        <p>No Friends Active...</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FriendsActive