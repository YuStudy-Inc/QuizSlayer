import "../Styles/Components/ResultsCard.css"

const ResultCard = ({ didWin, coins, monsters, xp, lvl }) => {
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
                        <p className="left-results">XP Received</p>
                        <p className="right-results">{xp}</p>
                    </div>
                    <div className="progress-bar">
                        <div className="full-bar">
                            <div className="actual-bar"></div>
                        </div>
                        <div className="level">
                            <h1>lv. {lvl}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResultCard