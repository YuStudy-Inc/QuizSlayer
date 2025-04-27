import express from 'express'
import multer from 'multer';
import { createQuiz, editQuiz, deleteQuiz, getQuiz, createPDFQuiz} from '../controllers/quizController.js'

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({storage});
/* router.get('/getQuizzes', getQuizzesFromUserID) */
router.post('/createQuiz', createQuiz)
router.put('/editQuiz/:id', editQuiz)
router.get('/getQuiz/:id', getQuiz)
router.delete('/deleteQuiz/:id', deleteQuiz)
router.post('/createPDFQuiz', upload.single('pdf'), createPDFQuiz)
router.get('/', (req, res) => {
    res.send('Users route works!');
  });
export default router