import "../Styles/Pages/Results.css"
import Podium from "../Components/Podium"
import ResultCard from "../Components/ResultCard"


const Results = ({didWin, }) => {
    const win = "You beat the Quiz!"
    const lose = "Better luck next time..."

    return(
        <>
            <div className="results-container">
                <div className="show-results">
                    <h1 className="results-title">{didWin ? win : lose}</h1>
                    <div className="container-for-cards-and-character">
                        <Podium />
                        <ResultCard didWin={true} coins={"27"} monsters={"3"} xp={"87"} lvl={"9"}/>
                    </div>
                </div>
                <button className="from-results-to-home">Continue</button>
            </div>
        </>
    ) 
}

export default Results
