import "../Styles/Components/FriendsActive.css"

const FriendsActive = ({ className= "", friends }) => {
    return (
        <>
            <div className={`friends-active-container ${className}`}>
                <h1>Active</h1>
                {/* add the list of friends from the db */}
            </div>
        </>
    )
}

export default FriendsActive