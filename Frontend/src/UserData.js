const UserData = (() => {
    // let userDataCookie = document.cookie
    // .split('; ')
    // .find(row => row.startsWith('userData='));

    let userData;

    // if (userDataCookie) {
    //     userData = JSON.parse(decodeURIComponent(userDataCookie.split('=')[1]));
    // } else {
    //     console.log('User data cookie not found');
    // }

    const updateUserData = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        userData = user;
        // userDataCookie = document.cookie
        // .split('; ')
        // .find(row => row.startsWith('userData='));
        // if (userDataCookie) {
        //     userData = JSON.parse(decodeURIComponent(userDataCookie.split('=')[1]));
        // } else {
        //     console.log('User data cookie not found');
        // }
    };

    const loadUserData = () => {
        console.log("Loading user data: ")
        userData = JSON.parse(localStorage.getItem("user"));
    }


// const getUsername = () => {
//     if (!userData) {
//         loadUserData();
//     }
//     return userData?.username;
// };
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

// const getEmail = () => {
//     return userData?.email;
// };

// const getPassword = () => {
//     return userData?.password;
// };

// const getIsOnline = () => {
//     return userData?.isOnline;
// };

// const getPfp = () => {
//     return userData?.pfp;
// };

// const getDescription = () => {
//     return userData?.description;
// };

// const getFriendsList = () => {
//     return userData?.friendsList;
// };

// const getFriendRequests = () => {
//     return userData?.friendRequests;
// };

// const getInventory = () => {
//     return userData?.inventory;
// };

// const getCharacterList = () => {
//     return userData?.characterList;
// };

// const getSelectedCharacter = () => {
//     return userData?.selectedCharacter;
// };

// const getSelectedHat = () => {
//     return userData?.selectedHat;
// };

// const getSelectedWeapon = () => {
//     return userData?.selectedWeapon;
// };

// const getXp = () => {
//     return userData?.xp;
// };

// const getCoins = () => {
//     return userData?.coins;
// };

// const getMonstersSlain = () => {
//     return userData?.monstersSlain;
// };


    // const getUsername = () => {
    //     return userData?.username;
    // };
    // const setUsername = (value) => {
    //     if (userData) userData.username = value;
    //     document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    // };

    // const getPfp = () => {
    //     return userData?.pfp;
    // };
    // const setPfp = (value) => {
    //     if (userData) userData.pfp = value;
    //     document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    // };

    // const getDescription = () => {
    //     return userData?.description;
    // };
    // const setDescription = (value) => {
    //     if (userData) userData.description = value;
    //     document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    // };

    // const getFriendsList = () => {
    //     return userData?.friendsList;
    // };
    // const setFriendsList = (value) => {
    //     if (userData) userData.friendsList = value;
    //     document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    // };

    // const getFriendRequests = () => {
    //     return userData?.friendRequests;
    // };
    // const setFriendRequests = (value) => {
    //     if (userData) userData.friendRequests = value;
    //     document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    // };

    // const getInventory = () => {
    //     return userData?.inventory;
    // };
    // const setInventory = (value) => {
    //     if (userData) userData.inventory = value;
    //     document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    // };

    // const getCharacterList = () => {
    //     return userData?.characterList;
    // };
    // const setCharacterList = (value) => {
    //     if (userData) userData.characterList = value;
    //     document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    // };

    // const getSelectedCharacter = () => {
    //     return userData?.selectedCharacter;
    // };
    // const setSelectedCharacter = (value) => {
    //     if (userData) userData.selectedCharacter = value;
    //     document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    // };

    // const getSelectedHat = () => {
    //     return userData?.selectedHat;
    // };
    // const setSelectedHat = (value) => {
    //     if (userData) userData.selectedHat = value;
    //     document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    // };

    // const getSelectedWeapon = () => {
    //     return userData?.selectedWeapon;
    // };
    // const setSelectedWeapon = (value) => {
    //     if (userData) userData.selectedWeapon = value;
    //     document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    // };

    // const getXp = () => {
    //     return userData?.xp;
    // };
    // const setXp = (value) => {
    //     if (userData) userData.xp = value;
    //     document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    // };

    // const getCoins = () => {
    //     return userData?.coins;
    // };
    // const setCoins = (value) => {
    //     if (userData) userData.coins = value;
    //     document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    // };

    // const getMonstersSlain = () => {
    //     return userData?.monstersSlain;
    // };
    // const setMonstersSlain = (value) => {
    //     if (userData) userData.monstersSlain = value;
    //     document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}`;
    // };

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