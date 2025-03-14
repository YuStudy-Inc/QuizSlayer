import express from 'express'
import { createQuiz, editQuiz, deleteQuiz } from '../controllers/quizController'

const router = express.Router();

/* router.get('/getQuizzes', getQuizzesFromUserID) */
router.post('/createQuiz', createQuiz)
router.put('/editQuiz/:id', editQuiz)
router.delete('/deleteQuiz/:id', deleteQuiz)

export default router