import express from 'express';
import { createUser, loginUser, editUser, editUserPassword, deleteUser, getUser, getUsername, getDescription, 
  getActiveFriends, getFriends, getCharacterList, getInventory, getTop10, 
  getFriendRequests, acceptFriendRequest, rejectFriendRequest, sendFriendRequest, updateSelections,
  getAICreations, increaseAICreations, getUsersCoins, updateUsersCoins, addCharacterToList, addItemToInventory, 
  updateUserMonstersSlain} from '../controllers/userController.js';

const router = express.Router();
router.post('/createUser', createUser);
router.post('/loginUser', loginUser);
router.put('/editUser/:id', editUser);
router.put('/editUser/password/:id', editUserPassword);
router.delete('/deleteUser/:id', deleteUser);
router.get('/getUser', getUser);
router.get('/getUsername/:id', getUsername)
router.get('/getDescription/:id', getDescription)
router.get('/getUsersActiveFriends/:id', getActiveFriends)
router.get('/getFriends/:id', getFriends)
router.get('/getCharacterList/:id', getCharacterList)
router.get('/getInventory/:id', getInventory)
router.get('/getTop10', getTop10)
router.get('/getUsersFriendRequests/:id', getFriendRequests)
router.get('/getAICreations', getAICreations);
router.post('/increaseAICreations', increaseAICreations);
router.put('/acceptFriendRequest/:id', acceptFriendRequest)
router.put('/rejectFriendRequest/:id', rejectFriendRequest)
router.post('/sendFriendRequest/:id', sendFriendRequest)
router.post('/updateSelections', updateSelections)
router.get('/getUsersCoins/:id', getUsersCoins)
router.put('/updateCoins/:id', updateUsersCoins)
router.put('/addCharacter/:id', addCharacterToList)
router.put('/addItem/:id', addItemToInventory)
router.put('/updateMonstersSlain/:id', updateUserMonstersSlain)

/* router.get('/getFriends/:id', getFriendsFromUserID) */
router.get('/', (req, res) => {
    res.send('Users route works!');
  });

router.post('/updateSelections', updateSelections);
  
export default router;