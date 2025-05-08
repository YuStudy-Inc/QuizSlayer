import "../../Styles/Components/LandingPage/LandingPageAboutUs.css"
import { home, quiz, friends } from "../../assets/Pictures.js"

const LandingPageAboutUs = () => {
    return (
        <>
            <div className="about-us-container">
                <div className="about-us">
                    <div className="about-us-pictures">
                        <img src={home} alt="" />
                        <img src={quiz} alt="" />
                        <img src={friends} alt="" />
                    </div>
                    <div className="about-us-words">
                        <h1 className="about-us-title">About Us</h1>
                        <p>QuizSlayer is an interactive study app that turns your studying into an adventure.
                            Create flashcards on your own or through AI features and test your knowledge in an idle fighting game. 
                            Win battles, earn prizes. Compete against friends or against others to the be the best adventurer there is!!!</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPageAboutUs