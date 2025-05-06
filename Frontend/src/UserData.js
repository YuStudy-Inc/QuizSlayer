const UserData = (() => {
    let userData;

    const updateUserData = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('id', JSON.stringify(user._id));
        userData = user;
    };

    const loadUserData = () => {
        console.log("Loading user data: ")
        userData = JSON.parse(localStorage.getItem("user"));
    }


const createGetter = (key) => {
    return () => {
        if (!userData) {
            loadUserData();
        }
        return userData?.[key];
    };
};

const getEmail = createGetter("email");
const getPassword = createGetter("password");
const getIsOnline = createGetter("isOnline");
const getLastSeen = createGetter("lastSeen");
const getUsername = createGetter("username")
const getPfp = createGetter("pfp");
const getDescription = createGetter("description");
const getFriendsList = createGetter("friendsList");
const getFriendRequests = createGetter("friendRequests");
const getInventory = createGetter("inventory");
const getCharacterList = createGetter("characterList");
const getSelectedCharacter = createGetter("selectedCharacter");
const getSelectedHat = createGetter("selectedHat");
const getSelectedWeapon = createGetter("selectedWeapon");
const getXp = createGetter("xp");
const getCoins = createGetter("coins");
const getMonstersSlain = createGetter("monstersSlain");

    return {
        updateUserData,
        getUsername,
        // setUsername,
        getPfp,
        // setPfp,
        getDescription,
        // setDescription,
        getFriendsList,
        // setFriendsList,
        getFriendRequests,
        // setFriendRequests,
        getInventory,
        // setInventory,
        getCharacterList,
        // setCharacterList,
        getSelectedCharacter,
        // setSelectedCharacter,
        getSelectedHat,
        // setSelectedHat,
        getSelectedWeapon,
        // setSelectedWeapon,
        getXp,
        // setXp,
        getCoins,
        // setCoins,
        getMonstersSlain,
        // setMonstersSlain
    };
})();

export default UserData;