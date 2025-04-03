import "../../Styles/Pages/Results/Results.css"
import { Podium, ResultCard } from "../../Components/Components"


const Results = ({didWin, }) => {
    const win = "You beat the Quiz!"
    const lose = "Better luck next time..."

    return(
        <>
            <div className="results-container">
                <div className="results-title">
                    <h1>{didWin ? win : lose}</h1>
                </div>
                <div className="show-results">
                    <div className="container-for-cards-and-character">
                        <div className="container-for-podium-results-page">
                            <Podium />
                        </div>
                        <div className="container-for-result-card">
                            <ResultCard didWin={true} coins={"27"} monsters={"3"} xp={"87"} lvl={"9"}/>
                        </div>
                    </div>
                </div>
                <button className="from-results-to-home">Continue</button>
            </div>
        </>
    ) 
}

export default Results
