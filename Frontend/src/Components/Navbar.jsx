import "../Styles/index.css"
import "../Styles/Components/Navbar.css"
import { useState, useEffect } from "react"
import { Outlet, Link, useLocation, useNavigate} from "react-router-dom"

const Navbar = () => {    
    const location = useLocation()
    const navigate = useNavigate()
    const pages = ["collection", "quizzes", "home", "friends", "leaderboard"];
    const [activePage, setActivePage] = useState(pages.indexOf(location.pathname.replace("/", "")) || 0)

    const handleGoLeft = () => {
        const newPage = (activePage - 1 + pages.length) % pages.length
        setActivePage(newPage)
        navigate(`/${pages[newPage]}`)
    }
    
    const handleGoRight = () => {
        const newPage = (activePage + 1) % pages.length
        setActivePage(newPage)
        navigate(`/${pages[newPage]}`)
    }

    useEffect(() => {
        const pageYoureOn = pages.indexOf(location.pathname.replace("/", ""))
        if (pageYoureOn !== -1)
            setActivePage(pageYoureOn)
    }, [location])

    return (
        <>
            <div className="navbar-container">
                <div className="collection highlight big">
                    <Link to={"/collection"}>
                        <h1>COLLECTION</h1>
                    </Link>
                    <div className="selector"></div>
                </div>
                <div className="quizzes highlight big">
                    <Link to={"/quizzes"}>
                        <h1>QUIZZES</h1>
                    </Link>
                    <div className="selector"></div>
                </div>
                <div className="home highlight big">
                    <Link to={"/home"}>
                        <h1>HOME</h1>
                    </Link>
                    <div className="selector"></div>
                </div>
                <div className="friends highlight big">
                    <Link to={"/friends"}>
                        <h1>FRIENDS</h1>
                    </Link>
                    <div className="selector"></div>
                </div>
                <div className="leaderboard highlight big">
                    <Link to={"/leaderboard"}>
                        <h1>LEADERBOARD</h1>
                    </Link>
                    <div className="selector">
                    </div>
                </div>


                <div className="small-nav">
                    <button onClick={handleGoLeft} className={`button-nav ${activePage === 0 ? "hidden": ""}`}><h1>&lt;</h1></button>
                    <h1>{pages[activePage].toUpperCase()}</h1>
                    <button onClick={handleGoRight} className={`button-nav ${activePage === 4 ? "hidden": ""}`}><h1>&gt;</h1></button>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Navbar