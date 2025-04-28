import express from 'express';
import { createUser, loginUser, editUser, editUserPassword, deleteUser, updateSelections } from '../controllers/userController.js';

const router = express.Router();
router.post('/createUser', createUser);
router.post('/loginUser', loginUser);
router.put('/editUser/:id', editUser);
router.put('/editUser/password/:id', editUserPassword);
router.delete('/deleteUser/:id', deleteUser);
/* router.get('/getFriends/:id', getFriendsFromUserID) */
router.get('/', (req, res) => {
    res.send('Users route works!');
  });

router.post('/updateSelections', updateSelections);
  
export default router;