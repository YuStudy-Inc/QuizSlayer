import express from 'express';
import { createUser, loginUser, editUser, editUserPassword, deleteUser, getUsername, getDescription, 
  getActiveFriends, getFriends, getCharacterList, getInventory, getTop10, 
  getFriendRequests, acceptFriendRequest, rejectFriendRequest, sendFriendRequest, updateSelections } from '../controllers/userController.js';

const router = express.Router();
router.post('/createUser', createUser);
router.post('/loginUser', loginUser);
router.put('/editUser/:id', editUser);
router.put('/editUser/password/:id', editUserPassword);
router.delete('/deleteUser/:id', deleteUser);
router.get('/getUsername/:id', getUsername)
router.get('/getDescription/:id', getDescription)
router.get('/getUsersActiveFriends/:id', getActiveFriends)
router.get('/getFriends/:id', getFriends)
router.get('/getCharacterList/:id', getCharacterList)
router.get('/getInventory/:id', getInventory)
router.get('/getTop10', getTop10)
router.get('/getUsersFriendRequests/:id', getFriendRequests)
router.put('/acceptFriendRequest/:id', acceptFriendRequest)
router.put('/rejectFriendRequest/:id', rejectFriendRequest)
router.post('/sendFriendRequest/:id', sendFriendRequest)

/* router.get('/getFriends/:id', getFriendsFromUserID) */
router.get('/', (req, res) => {
    res.send('Users route works!');
  });

router.post('/updateSelections', updateSelections);
  
export default router;