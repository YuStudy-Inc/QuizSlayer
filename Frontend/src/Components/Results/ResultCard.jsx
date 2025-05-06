import "../../Styles/Components/Results/ResultsCard.css"

const ResultCard = ({ didWin, coins, monsters }) => {
    return (
        <>
            <div className="results-card-container">
                <div className="results-stuff">
                    <h1 className="title-in-results-card">Results</h1>
                    <div className="analytics">
                        <p className="left-results">Coins {didWin ? "received" : "lost"}</p>
                        <p className="right-results">{coins}</p>
                        <p className="left-results">Monsters Slain</p>
                        <p className="right-results">{monsters}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResultCard