import "../Styles/index.css"
import "../Styles/Components/Navbar.css"
import { Link } from "react-router-dom"

const Navbar = () => {


    
    return (
        <>
            <div className="navbar-container">
                <div className="collection highlight">
                    <Link to={"/collection"}>
                        <h1>COLLECTION</h1>
                    </Link>
                    <div className="selector"></div>
                </div>
                <div className="quizzes highlight">
                    <Link to={"/quizzes"}>
                        <h1>QUIZZES</h1>
                    </Link>
                    <div className="selector"></div>
                </div>
                <div className="home highlight">
                    <Link to={"/home"}>
                        <h1>HOME</h1>
                    </Link>
                    <div className="selector"></div>
                </div>
                <div className="friends highlight">
                    <Link to={"/friends"}>
                        <h1>FRIENDS</h1>
                    </Link>
                    <div className="selector"></div>
                </div>
                <div className="leaderboard highlight">
                    <Link to={"/leaderboard"}>
                        <h1>LEADERBOARD</h1>
                    </Link>
                    <div className="selector">
                        <div className="selector-left"></div>
                        <div className="selector-right"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar