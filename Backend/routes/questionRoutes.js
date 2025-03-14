import express from 'express';
import { createQuestion, editQuestion, deleteQuestion } from '../controllers/questionController';

const router = express.Router();

/* router.get('/getQuestions', getQuestionsFromQuizID) */
router.post('/createQuestion', createQuestion)
router.put('/editQuestion/:id', editQuestion)
router.delete('/deleteQuestion/:id', deleteQuestion)

export default router