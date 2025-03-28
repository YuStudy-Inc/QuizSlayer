import express from 'express'
import { createQuiz, editQuiz, deleteQuiz } from '../controllers/quizController.js'

const router = express.Router();

/* router.get('/getQuizzes', getQuizzesFromUserID) */
router.post('/createQuiz', createQuiz)
router.put('/editQuiz/:id', editQuiz)
router.delete('/deleteQuiz/:id', deleteQuiz)
router.get('/', (req, res) => {
    res.send('Users route works!');
  });
export default router