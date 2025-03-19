import express from 'express';
import { createUser, loginUser, editUser, editUserPassword, deleteUser } from '../controllers/userController.js';

const router = express.Router();
router.post('/createUser', createUser);
router.post('/loginUser', loginUser);
router.put('/editUser/:id', editUser);
router.put('/editUser/password/:id', editUserPassword);
router.delete('/deleteUser/:id', deleteUser);
/* router.get('/getFriends/:id', getFriendsFromUserID) */

export default router;