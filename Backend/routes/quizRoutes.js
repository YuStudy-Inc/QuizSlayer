import express from 'express'
import { createQuiz, editQuiz, deleteQuiz, getQuiz, getQuizzes, getToDoQuizzes, getQuestionsFromQuiz, updateFinished, getFinishedQuizzes } from '../controllers/quizController.js'

const router = express.Router();

/* router.get('/getQuizzes', getQuizzesFromUserID) */
router.post('/createQuiz', createQuiz)
router.put('/editQuiz/:id', editQuiz)
router.put('/quizFinished/:id', updateFinished)
router.delete('/deleteQuiz', deleteQuiz)
router.get('/getQuiz/:id', getQuiz)
router.get('/getQuizzes/:id', getQuizzes)
router.get('/getToDoQuizzes/:id', getToDoQuizzes)
router.get('/getFinishedQuizzes/:id', getFinishedQuizzes)
router.get('/getQuestionsFromQuiz/:id', getQuestionsFromQuiz)
router.get('/', (req, res) => {
    res.send('Users route works!');
  });
export default router