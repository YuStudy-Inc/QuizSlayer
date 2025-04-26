const UserData = (() => {
    let userDataCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('userData='));

    let userData;

    if (userDataCookie) {
        userData = JSON.parse(decodeURIComponent(userDataCookie.split('=')[1]));
    } else {
        console.log('User data cookie not found');
    }

    const updateUserData = () => {
        if (userDataCookie) {
            userData = JSON.parse(decodeURIComponent(userDataCookie.split('=')[1]));
        } else {
            console.log('User data cookie not found');
        }
    };

    const getUsername = () => {
        return userData?.username;
    };
    const setUsername = (value) => {
        if (userData) userData.username = value;
        document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    };

    const getPfp = () => {
        return userData?.pfp;
    };
    const setPfp = (value) => {
        if (userData) userData.pfp = value;
        document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    };

    const getDescription = () => {
        return userData?.description;
    };
    const setDescription = (value) => {
        if (userData) userData.description = value;
        document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    };

    const getFriendsList = () => {
        return userData?.friendsList;
    };
    const setFriendsList = (value) => {
        if (userData) userData.friendsList = value;
        document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    };

    const getFriendRequests = () => {
        return userData?.friendRequests;
    };
    const setFriendRequests = (value) => {
        if (userData) userData.friendRequests = value;
        document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    };

    const getInventory = () => {
        return userData?.inventory;
    };
    const setInventory = (value) => {
        if (userData) userData.inventory = value;
        document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    };

    const getCharacterList = () => {
        return userData?.characterList;
    };
    const setCharacterList = (value) => {
        if (userData) userData.characterList = value;
        document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    };

    const getSelectedCharacter = () => {
        return userData?.selectedCharacter;
    };
    const setSelectedCharacter = (value) => {
        if (userData) userData.selectedCharacter = value;
        document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    };

    const getSelectedHat = () => {
        return userData?.selectedHat;
    };
    const setSelectedHat = (value) => {
        if (userData) userData.selectedHat = value;
        document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    };

    const getSelectedWeapon = () => {
        return userData?.selectedWeapon;
    };
    const setSelectedWeapon = (value) => {
        if (userData) userData.selectedWeapon = value;
        document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    };

    const getXp = () => {
        return userData?.xp;
    };
    const setXp = (value) => {
        if (userData) userData.xp = value;
        document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    };

    const getCoins = () => {
        return userData?.coins;
    };
    const setCoins = (value) => {
        if (userData) userData.coins = value;
        document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    };

    const getMonstersSlain = () => {
        return userData?.monstersSlain;
    };
    const setMonstersSlain = (value) => {
        if (userData) userData.monstersSlain = value;
        document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    };

    return {
        updateUserData,
        getUsername,
        setUsername,
        getPfp,
        setPfp,
        getDescription,
        setDescription,
        getFriendsList,
        setFriendsList,
        getFriendRequests,
        setFriendRequests,
        getInventory,
        setInventory,
        getCharacterList,
        setCharacterList,
        getSelectedCharacter,
        setSelectedCharacter,
        getSelectedHat,
        setSelectedHat,
        getSelectedWeapon,
        setSelectedWeapon,
        getXp,
        setXp,
        getCoins,
        setCoins,
        getMonstersSlain,
        setMonstersSlain
    };
})();

export default UserData;