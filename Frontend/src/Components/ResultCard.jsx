const ResultCard = ({ didWin, coins, monsters, xp, lvl }) => {
    return (
        <>
            <div className="results-card-container">
                <h1>Results</h1>
                <div className="analytics">
                    <p>Coins {didWin ? "received" : "lost"}</p>
                    <p>{coins}</p>
                    <p>Monsters Slain</p>
                    <p>{monsters}</p>
                    <p>XP Received</p>
                    <p>{xp}</p>
                </div>
                <div className="progress-bar">
                    <div className="full-bar">
                        <div className="actual-bar"></div>
                    </div>
                </div>
                <div className="level">
                    <h1>{lvl}</h1>
                </div>
            </div>
        </>
    )
}

export default ResultCard